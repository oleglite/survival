import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import {Provider} from 'react-redux';

import store from './core/store';
import history from './core/history';
import Toaster from './components/Toaster'
import Router from './components/Router'

const container = document.getElementById('container');

function render () {
    ReactDOM.render(
        <div>
            <Toaster/>
            <Provider store={store}>
                <Router/>
            </Provider>
        </div>,
        container
    )
}

render()

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);
