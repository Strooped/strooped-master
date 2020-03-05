import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

// Suspense is used by react-i18next when translations are not ready
const App = () => <BrowserRouter>
    <Layout>
        <div>
            Hello world
        </div>
    </Layout>
</BrowserRouter>;

export default App;
