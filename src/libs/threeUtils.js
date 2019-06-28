/**
 * 使用必读
 * 模型点击注意：1、模型添加前 设置 属性 clickFlag = true, clickParam = ?。
 *
 */

import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import planet from '@/assets/img/earth_atmos_2048.jpg'

const clearModels = (scene) => {
  // 从scene中删除模型并释放内存
  if (scene) {
    var children = scene.children
    for (var i = 0; i < children.length; i++) {
      deleteGroup(children[i])
      scene.remove(children[i])
    }
  }
}
// 删除group，释放内存
const deleteGroup = (group) => {
  if (!group) return
  // 删除掉所有的模型组内的mesh
  group.traverse(function (item) {
    if (item instanceof THREE.Mesh) {
      item.geometry.dispose() // 删除几何体
      item.material.dispose() // 删除材质
    }
  })
}
export class ThreeUtilOption {
  constructor (rotateSpeech, cameraDistance, controlZoomFlag, positionYOffset, modelClickCall = function () {}) {
    this.rotateSpeech = rotateSpeech || 0.0008
    this.cameraDistance = cameraDistance || 50
    this.positionYOffset = positionYOffset || 0// 整个canvas y轴偏移量：下移为正
    this.enableZoom = controlZoomFlag
    this.modelClickCall = modelClickCall
  }
}

export class ThreeUtil {
  constructor (dom, options = new ThreeUtilOption()) {
    this.container = dom
    /* eslint-disable */
    this.scene
    this.camera
    this.renderer
    this.controls
    this.modelGroup
    this.animationStopFlag = false
    this.animationId
    this.options = options
    /* eslint-enable */
  }
  initBaseModule () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500)
    // this.camera = new THREE.PerspectiveCamera( 40, this.container.width/this.container.height, 1, 1000 );
    this.camera.position.z = this.options.cameraDistance
    // this.renderer = new THREE.WebGLRenderer();
    this.renderer = new THREE.WebGLRenderer({ canvas: this.container })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    // this.renderer.setSize( this.container.width, this.container.height );
  }
  setContainer () {
    // this.container.appendChild( this.renderer.domElement );
  }
  addControl () {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = this.options.enableZoom

    // this.controls.target = new THREE.Vector3( 0, 10, 0 );
    // this.controls.minDistance = 20;
    // this.controls.maxDistance = 50;
    // this.controls.maxPolarAngle = Math.PI / 2;
  }
  addGroupModel () {
    this.modelGroup = new THREE.Group()
    this.scene.add(this.modelGroup)
  }
  init () {
    this.initBaseModule()
    // this.setContainer();
    this.addControl()
    this.addGroupModel()
  }
  startAnimate = () => {
    if (!this.animationStopFlag) {
      this.animationId = requestAnimationFrame(this.startAnimate)
      //        modelGroup.rotation.x += 0.005;
      this.modelGroup.rotation.y += this.options.rotateSpeech
      this.renderer.render(this.scene, this.camera)
    }
  }
  stopAnimate () {
    this.animationStopFlag = true
    cancelAnimationFrame(this.animationId)
  }
  restartAnimate = () => {
    this.animationStopFlag = false
    this.startAnimate()
  }
  createSpriteNoPosition = (content, styles = {
    canvasW: 256, fontColor: '#FF4500', fontStyle: 'Bold 100px Arial', lineW: 4
  }) => {
    // 先用画布将文字画出
    let canvas = document.createElement('canvas')
    canvas.width = styles.canvasW
    // canvas.height = 400;
    let ctx = canvas.getContext('2d')

    ctx.fillStyle = styles.fontColor
    ctx.font = styles.fontStyle
    ctx.lineWidth = styles.lineW
    ctx.fillText(content, 0, 120, 256)

    let texture = new THREE.Texture(canvas)
    texture.needsUpdate = true// 不设置，会 不出现

    // 使用Sprite显示文字
    let material = new THREE.SpriteMaterial({ map: texture })
    let textObj = new THREE.Sprite(material)
    textObj.scale.set(4, 2, 1)
    //        textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
    return textObj
  }
  getClickModel = (event) => {
    event.preventDefault()
    let mouse = {}

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    if (event.touches) {
      mouse.x = (event.changedTouches[0].pageX / window.innerWidth) * 2 - 1
      mouse.y = -((event.changedTouches[0].pageY - this.options.positionYOffset) / window.innerHeight) * 2 + 1
    }
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)

    vector = vector.unproject(this.camera)

    let raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
    let intersects = raycaster.intersectObjects(this.modelGroup.children)

    if (intersects.length > 0 && intersects[0].distance < this.options.cameraDistance && intersects[0].object.clickFlag) {
      this.options.modelClickCall(intersects[0].object)
    }
  }
  onTouchStart = (e) => {
    // 记录触点初始位置
    let touch = e.touches[0] // 获取第一个触点
    this.startX = Number(touch.pageX) // 页面触点X坐标
    this.startY = Number(touch.pageY) // 页面触点Y坐标
  }
  // 监听移动端touchEnd事件
  onTouchEnd = (e) => {
    if (e.changedTouches[0].pageX == this.startX && e.changedTouches[0].pageY == this.startY) { this.getClickModel(e) }
  }
  bindEvent () {
    this.container.addEventListener('touchstart', this.onTouchStart, false)
    this.container.addEventListener('touchend', this.onTouchEnd, false)
  }
  removeEvent () {
    this.container.removeEventListener('touchstart', this.onTouchStart, false)
    this.container.removeEventListener('touchend', this.onTouchStart, false)
  }
  clearModel = clearModels
  switchThree () {
    this.stopAnimate()
    this.clearModel(this.scene)
    this.removeEvent()
    this.addGroupModel()
  }
  destroy () {
    this.stopAnimate()
    this.clearModel(this.scene)
  }

  /**
   * 添加艺术星球
   * @returns {Mesh}
   */
  getPlanet () {
    var earthGeometry = new THREE.SphereBufferGeometry(3, 16, 16)
    var earthMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(planet)
    })
    return new THREE.Mesh(earthGeometry, earthMaterial)
  }

  /**
   * 添加星空精灵
   * @param data  数据点
   */
  addManySprites (data) {
    var vertices = new THREE.DodecahedronGeometry(10).vertices
    // 在 坐标点 遍历的前提下，填满坐标点。data不够的话 就再来一遍
    let size = data.length

    vertices.forEach((item, index) => {
      let rate = parseInt(index / size)
      let dataIndex = index - size * rate
      console.log('序列:' + dataIndex, 'rate: ' + rate)
      let curDataItem = data[dataIndex]
      var sprite = this.createSpriteNoPosition(curDataItem)
      sprite.position.set(item.x, item.y, item.z)
      sprite.clickFlag = true
      sprite.clickParam = curDataItem
      this.modelGroup.add(sprite)
    })
  }
}
