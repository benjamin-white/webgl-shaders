import { MaterialPreview } from './modules/material-preview'
import fragmentShader      from './modules/material-3.frag'
import vertexShader        from './modules/material.vert'
import './index.scss'

new MaterialPreview(
  '#js-threeViewer',
  [vertexShader, fragmentShader]
);
