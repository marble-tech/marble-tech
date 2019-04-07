import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { Route } from "../../lib/components/route/route";
import { Header, Footer } from "../../lib/components";
import { routes } from "../config/routing";
import * as authGuard from '../../helpers/authGuard';
import { Main } from "../../lib/components/main/main";

class Layout extends React.Component {
    public render() {
        const HeaderM = withRouter(({ history }) =>
                    <Header
                        history={history}
                        items={
                            routes.filter(item => item.displayInNavBar !== false)
                                .map(item => {
                                    return {
                                        href: item.path,
                                        isIndex: item.isIndex,
                                        title: item.title,
                                        onlyGuest: item.onlyGuest || false
                                    };
                                })
                        }
                    />
                    
                    )
        return (
            <React.Fragment>
                <HeaderM/>
                <Main/>
                <Footer />
            </React.Fragment>
        );
    }
}
export default Layout;