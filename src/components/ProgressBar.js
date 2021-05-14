import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = ({values}) => (
  <span>
    COUCOU
    {/*{values.current / values.total * 100}*/}
    <Progress percent={11} />
  </span>
);

export default ProgressBar
