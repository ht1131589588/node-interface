'use strict';

import admin from './admin';
import article from './article';

export default app => {
    app.use('/admin', admin);
    app.use('/article', article);
}