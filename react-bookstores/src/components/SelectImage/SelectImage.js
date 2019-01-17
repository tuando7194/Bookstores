import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import Button from 'components/CustomButtons/Button'
import Icon from "@material-ui/core/Icon/Icon";
import { previewFile } from 'utils/helpers';
import { isCreateURL } from 'utils/helpers';

class SelectImage extends React.Component {
  onClickChange = () => {
    this.fileInput.click()
  };

  onClickRemove = () => {
    this.fileInput.value = "";
    this.onChange("");
  }

  onFileChange = (event) => {
    this.onChange(event.target.files[0]);
  };

  onChange = (file) => {
    this.props.onChange(file);
  };

  render() {
    const { src } = this.props;
    return (
      <div className="select-image">
        <div className="fileinput"><input type="file" accept="image/jpeg, image/png" ref={fileInput => this.fileInput = fileInput} onChange={this.onFileChange} />
          <div className="thumbnail"><img
            src={isCreateURL(src) ? URL.createObjectURL(src) : (src || '')}
            alt="..."
            onError={(e)=>{e.target.onerror = null; e.target.src="https://demos.creative-tim.com/material-dashboard-pro-react/static/media/image_placeholder.ebe9884b.jpg"}}
          />
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button color="rose" className="more-border" onClick={this.onClickChange}>
              {
                src ? 'Change' : 'Select image'
              }
            </Button>
            {src && <Button color="warning" className="more-border" style={{backgroundColor: '#f44336'}} onClick={this.onClickRemove}>
              <Icon style={{fontSize: '18px', paddingRight: '6px', fontWeight: 900}}>clear</Icon>
              Remove
            </Button>}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectImage;