import React from 'react';
import ReactDOM from 'react-dom';

//codesandbox.io/s/react-iframe-demo-g3vst codePen =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
    />
  );
}

const Schools = () => {
  return (
    <div className="iframe">
      <h3>School Reviews</h3>
      <Iframe
        iframe={
          '<iframe class="airtable-embed" src="https://airtable.com/embed/shruwb1Qwbpcjt03g?backgroundColor=blue&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="1400px" style="background: transparent; border: 1px solid #ccc;"></iframe>'
        }
        allow="autoplay"
      />
      ,
    </div>
  );
};

export default Schools;
