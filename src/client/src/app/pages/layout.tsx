import React from "react";
import { withRouter } from "react-router-dom";
import { Header, Footer } from "../../lib/components";
import { routes } from "../config/routing";
import { Main } from "../../lib/components/main/main";

class Layout extends React.Component {
    public render() {
        const HeaderM = withRouter(({ history, location, match }) =>
                    <Header
                        history={history}
                        location={location}
                        match={match}
                        items={
                            routes.filter(item => item.displayInNavBar !== false)
                                .map(item => {
                                    return {
                                        href: item.href,
                                        isIndex: item.isIndex,
                                        title: item.title,
                                        onlyGuest: item.onlyGuest || false,
                                        isProtected: item.isProtected || false
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