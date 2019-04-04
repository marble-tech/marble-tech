import React from "react";
import { Switch, Route } from "react-router-dom";
import { Header, Footer } from "../../lib/components";
import { routes } from "../config/routing";

class Layout extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <Header
                    items={
                        routes.filter(item => item.displayInNavBar !== false)
                            .map(item => {
                                return {
                                    href: item.path,
                                    isIndex: item.isIndex,
                                    title: item.title
                                };
                            })
                    }
                />
                <Switch>
                    <React.Fragment>
                        <div className="" style={{minHeight: "800px", backgroundColor: 'var(--white)'}}>
                            {
                                routes.map((item, key) => <Route exact={item.exactPath} path={item.path} component={item.component} key={key} />)
                            }
                        </div>
                    </React.Fragment>
                </Switch>
                <Footer />
            </React.Fragment>
        );
    }
}
export default Layout;