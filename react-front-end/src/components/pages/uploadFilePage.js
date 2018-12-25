import React from 'react';
import AlertMessageModal from '../tools/AlertMessageModal';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UploaFilePage extends React.component{

    constructor(){
        super();
        this.state={
        }
    }
    onChange(e){
        let files=e.target.files;
        let reader=new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e)=>{
console.log("data: "+e.target.result);
const url
        }
    }

    render(){
        return(
            <div onSubmit={this.onFormSubmit}>
    <h1>React js File Upload Tutorial</h1>
            <input type="file" name="file" onChange={(e)=>this.onChange=(e)}></input>
            </div>
        );
    }
}
export default UploaFilePage;