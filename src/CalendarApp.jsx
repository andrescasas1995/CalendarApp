import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

import AppRouter from './routers/AppRouter';
// import PropTypes from 'prop-types';

const CalendarApp = props => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

// CalendarApp.propTypes = {
    
// };

export default CalendarApp;