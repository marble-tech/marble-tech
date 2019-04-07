import React, {Component, CSSProperties} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Content } from '../content/content';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

interface FBModalProps{
    onHide: () => any;
    show: boolean;
    // failures: number;
    feedback: {
      failures:number,
      results:any[]
    }
}

interface FBModalState{

}
export class FeedbackModal extends Component<FBModalProps,FBModalState>{
    constructor(props:FBModalProps){
        super(props)
    }
    private _renderIcon(){
      let modalIconClasses = "mx-auto d-block img-fluid"
      let modalIconCSS:CSSProperties = {height: "inherit"}
      return this.props.feedback.failures > 0 ?
        <img src="/images/x.png" className={modalIconClasses} style={modalIconCSS}/>
        :
        <img src="/images/tick.png" className={modalIconClasses} style={modalIconCSS}/>
    }
    private _renderResults(){
      const { results } = this.props.feedback
      // render the icon acording to the result state
      let icon:any = (state:string)=>{
            if(state=="passed"){
              return <i className="fas fa-check text-success"></i>
            }
            return <i className="fas fa-times text-danger"></i>
            
        }
      return (
        <ul className="list-group list-group-flush">{
          results.map((item:any, index:number)=>{
            return <li className={"list-group-item "+ (index==0 ? "border-0":"") }>{icon(item.state)}
              {"    "}
              <h5 className="d-inline">{item.title}</h5>
            </li>
           
          })
        }</ul>
      )

      
    }
    render(){
        return (
            <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Content >
            <div style={{height:"200px"}} >{this._renderIcon()}</div>
          </Content>
          <Content className="py-3">
            <h4></h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros:
            </p>
            {this._renderResults()}  
          </Content>
          <Content><Button className="float-right" onClick={this.props.onHide}>Close</Button></Content>
        </Modal.Body>
      </Modal>
        )

    }
} 


	  