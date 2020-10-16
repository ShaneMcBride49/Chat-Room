import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/Navbar'
import 'bootstrap-theme/bootstrap.min.css';
import './index.css';
import ListGroup from 'react-bootstrap/ListGroup'
import logo from './logo.png';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();