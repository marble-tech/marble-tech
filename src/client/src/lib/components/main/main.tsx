import React from "react";
import { Switch, Redirect } from "react-router";
import { routes } from "../../../app/config/routing";
import { Route } from "../route/route";

export class Main extends React.Component{
    render(){   
        return (
            <div className="" style={{minHeight: "800px", backgroundColor: 'var(--white)'}}>
            <Switch >
                    <Redirect from="/challenges" exact to="/challenges/1" />  
                    
                    {
                        routes.map((item, key) => {
                            const {...rest} = item;
                           return <Route 
                                {...rest}
                                key={key}
                            />
                    })
                    }
                            
        </Switch>
        </div>
        )
    }
}