import React from "react";
import { Header, Footer } from "../../lib/components";
import { Main } from "../../lib/components/main/main";

class Layout extends React.Component {
    public render() {
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