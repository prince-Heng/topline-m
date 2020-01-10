//  专门封装vant组件的模块，vant组件  先注册 在使用
import Vue from 'vue'

// 注册vant组件
import {
  Button,
  Cell,
  CellGroup,
  NavBar,
  Field,
  Toast,
  CountDown } from 'vant'

// 使用vant

Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Field)
  .use(Toast)
  .use(CountDown)
