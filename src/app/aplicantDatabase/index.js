import React from 'react';

//codesandbox.io/s/react-iframe-demo-g3vst codePen =
function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
    />
  );
}

const AplicantDatabase = () => {
  return (
    <div className="iframe">
      <h3>Aplicant Database</h3>
      <Iframe
        iframe={
          '<iframe class="airtable-embed" src="https://airtable.com/embed/shrKweFzBEkoWqzTp?backgroundColor=blue&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="1400px" style="background: transparent; border: 1px solid #ccc;"></iframe>'
        }
        allow="autoplay"
      />
      ,
    </div>
  );
};

export default AplicantDatabase;
