import React from 'react';
import { Link } from "react-router-dom";
import api from "../services/api"

class ToList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataLoad:false,
            employees:[] 
        }
    }

    deleteData(id){
        fetch(api+"?borrar="+id)
        .then(res=>res.json())
        .then((dataRes)=>{

            console.log(dataRes)
           this.loadData();
        })
        .catch(console.log())
    }


    loadData(){
        fetch(api)
        .then(res=>res.json())
        .then((dataRes)=>{
            console.log(dataRes)
            this.setState({dataLoad:true, employees:dataRes})
        })
        .catch(console.log())
    }

    componentDidMount(){
        this.loadData();
    }

    render() { 
        const{dataLoad, employees}=this.state
        if (!dataLoad) { 
            return(<div>Loading...</div>);
        }else{
            return ( 
            
                <div className="card">
                    <div className="card-header">
                    <Link className="btn btn-success" to={"/Create"}>Create new Employee</Link>
                    </div>
                    <div className="card-body">
                    <h4> Employee List</h4>
                    <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            (employee)=>(
                                <tr key={employee.id}>
                                    <td scope="row">{employee.id}</td>
                                    <td>{employee.nombre}</td>
                                    <td>{employee.correo}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link className="btn btn-secondary" to={"/Edit/"+employee.id}>Edit</Link>
                                           <button type="button" className="btn btn-danger"
                                           onClick={()=>this.deleteData(employee.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>  
                            )
                        )
                    }
                    
                </tbody>
            </table>
                    </div>
                    <div className="card-footer text-muted">
                       
                    </div>
                </div>
            
             );
        }  
    }
}
 
export default ToList;