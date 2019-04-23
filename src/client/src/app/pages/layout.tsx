import React from "react";
import { Header, Footer } from "../../lib/components";
import { Main } from "../../lib/components/main/main";
import { withRouter } from "react-router";

class Layout extends React.Component {
    public render() {
        // const HeaderM = withRouter(({ history }) =>
        // <Header history={history} />);
        return (
            <React.Fragment>
                <Header/>
                <Main/>
                <Footer />
            </React.Fragment>
        );
    }
}
export default Layout;