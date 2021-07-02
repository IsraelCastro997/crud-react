import React from 'react';
import { Link } from "react-router-dom";
import api from "../services/api"

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombre:"",
            correo:"",
            errors:[]
         }
    }
    changeValue = (e) => {
       
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({ state,errors:[]});
       
    }

    errorVerify(element){
        return this.state.errors.indexOf(element) !==-1;
    }

    sendData = (e) => {
        e.preventDefault();
        const {nombre,correo}=this.state;

        var errors=[];
        if (!nombre)errors.push("name_error");
        if (!correo)errors.push("email_error");

        this.setState({errors:errors});
        if (errors.length>0)return false;

        var dataToSend={nombre:nombre,correo:correo}

        fetch(api+"?insertar=1",{
            method:"POST",
            body:JSON.stringify(dataToSend),
        })
        .then(res=>res.json())
        .then((dataRes)=>{
            console.log(dataRes)
           this.props.history.push("/");
        })
        .catch(console.log)
        
    }

    render() { 
        const{nombre,correo}=this.state;
        return ( 
            <div className="card">
                <div className="card-header">
                    Create Employees
                </div>
                <div className="card-body">
                   <form onSubmit={this.sendData}>
                       <div className="form-group">
                         <label htmlFor="">Name:</label>
                         <input type="text" name="nombre"  onChange={this.changeValue} id="name" value={nombre} className={((this.errorVerify("name_error"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"></input>
                         <small id="helpId" className="invalid-feedback">Write the employee name</small>
                       </div>
                       <div className="form-group">
                         <label htmlFor="">Email:</label>
                         <input type="email" name="correo" onChange={this.changeValue} id="email" value={correo}  className={((this.errorVerify("email_error"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"></input>
                         <small id="helpId"className="invalid-feedback">Write the employee email
                         </small>
                       </div>
                       <div className="btn-group" role="group" aria-label="">
                           <button type="submit" className="btn btn-success">Create new employee</button>
                           <Link to={"/"} className="btn btn-danger">Cancel</Link>
                           
                       </div>
                   </form>
                </div>
                <div className="card-footer text-muted">
                
                </div>
            </div>
         );
    }
}
 
export default Create;