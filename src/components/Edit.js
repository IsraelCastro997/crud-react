import React from 'react';
import { Link } from "react-router-dom";
import api from "../services/api"

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoad:false,
            employee:[]
         }
    }

    componentDidMount(){
       
        const id = this.props.match.params.id
        fetch(api+"?consultar="+id)
        .then(res=>res.json())
        .then((dataRes)=>{
            console.log(dataRes)
            this.setState({
                dataLoad:true,
                employee:dataRes[0]
            })
        })
        .catch(console.log())
    }

    changeValue = (e) => {
       
        const state=this.state.employee;
        state[e.target.name]=e.target.value;
        this.setState({ employee:state});
       
    }

    sendData = (e) => {
        e.preventDefault();
       
        const{id,nombre,correo}= this.state.employee;

        var dataToSend={id:id,nombre:nombre,correo:correo}

        fetch(api+"/?actualizar=1",{
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
        const{dataLoad, employee}=this.state
        if (!dataLoad) { 
            return(<div>Loading...</div>);
        }else{
            return ( <div className="card">
                <div className="card-header">
                    Edit Employee
                </div>
                <div className="card-body">
                    
                    <form onSubmit={this.sendData}>
                        {employee.id}

                        <div className="form-group">
                          <label htmlFor="">Code:</label>
                          <input type="text" readOnly className="form-control" value={employee.id} onChange={this.changeValue} name="id" id="id" aria-describedby="helpId" placeholder=""></input>
                          <small id="helpId" className="form-text text-muted">Code</small>
                        </div>
                       <div className="form-group">
                         <label htmlFor="">Name:</label>
                         <input type="text" name="nombre"  onChange={this.changeValue} id="name" value={employee.nombre} className="form-control" placeholder="" aria-describedby="helpId"></input>
                         <small id="helpId" className="text-muted">Write the employee name</small>
                       </div>
                       <div className="form-group">
                         <label htmlFor="">Email:</label>
                         <input type="email" name="correo" onChange={this.changeValue} id="email" value={employee.correo} className="form-control" placeholder="" aria-describedby="helpId"></input>
                         <small id="helpId"className="text-muted">Write the employee email
                         </small>
                       </div>
                       <div className="btn-group" role="group" aria-label="">
                           <button type="submit" className="btn btn-success">Update employee data</button>
                           <Link to={"/"} className="btn btn-danger">Cancel</Link>
                       </div>
                   </form>
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div> );
        }
    }
}
 
export default Edit;