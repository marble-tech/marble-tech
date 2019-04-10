import React from "react";
import { Switch } from "react-router";
import { routes } from "../../../app/config/routing";
import { Route } from "../route/route";
export class Main extends React.Component{

    render(){
        return (
            <Switch >
            <React.Fragment>
                <div className="" style={{minHeight: "800px", backgroundColor: 'var(--white)'}}>
                    {
                        routes.map((item, key) => {
                            const {...rest} = item;
                           return <Route 
                                {...rest}
                                key={key}
                            />
                    })
                    }
                </div>
            </React.Fragment>
        </Switch>
        )
    }
}