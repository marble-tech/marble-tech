import React, {Component, CSSProperties} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Content } from '../content/content';

interface FBModalProps{
    onHide: () => any;
    show: boolean;
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
    private _renderFeedBack(){
      let divClasses = "my-5"
      let modalIconClasses = "mx-auto d-block img-fluid"
      let modalIconCSS:CSSProperties = {height: "inherit"}

      if(this.props.feedback.failures > 0){
        return <div>
        <div style={{height:"200px"}} className={divClasses}>
          <img src="/images/x.png" className={modalIconClasses} style={modalIconCSS}/>
        </div>
        <h4>Whoops, something went wrong...</h4>
      </div>
      }
      return <div >
        <div style={{height:"200px"}} className={divClasses}>
          <img src="/images/tick.png" className={modalIconClasses} style={modalIconCSS}/>
        </div>
        <h4>Well done, keep up!!!</h4>
      </div>
    }
    private _renderResults(){
      const { results } = this.props.feedback
      // render the icon acording to the result state
      let icon:any = (state:string)=>{
            if(state=="passed"){
              return <i className="fas fa-check text-success mr-4"></i>
            }
            return <i className="fas fa-times text-danger mr-4"></i>
        }
      return (
        <ul className="list-group list-group-flush">{
          results.map((item:any, index:number)=>{
            return <li className={"list-group-item "+ (index==0 ? "border-0":"") } key={index}>{icon(item.state)}
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
          <Content className="py-3">
            {this._renderFeedBack()}
            <h5>Check your results:</h5>
            {this._renderResults()}  
          </Content>
          <Content className="pb-3"><Button className="float-right" onClick={this.props.onHide}>Close</Button></Content>
      </Modal>
        )

    }
} 


	  