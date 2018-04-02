import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliar/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentWillMount() { // ComponentDidMount: Called after a component is mounted
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error});
            })
        }

        componentWillUnmount() { // It's executed when a component is not required anymore
            // Used to remove interceptors. Eject has to be used pointing to the reference of the interceptor 
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show = {this.state.error}
                           modalClosed = {this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );

        }

    } 
}

export default withErrorHandler;