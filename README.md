[![Taiga.io](https://img.shields.io/badge/managed%20with-TAIGA.io-709f14.svg)](https://tree.taiga.io/project/najbartomasz-my-savings/timeline)
[![Build Status](https://travis-ci.com/najbartomasz/my-savings-logger.svg?branch=master)](https://travis-ci.com/najbartomasz/my-savings-logger)
[![Coverage Status](https://coveralls.io/repos/github/najbartomasz/my-savings-logger/badge.svg?branch=master)](https://coveralls.io/github/najbartomasz/my-savings-logger?branch=master)
[![SonarCloud Quality Gate>](https://sonarcloud.io/api/project_badges/measure?project=najbartomasz_my-savings-logger&metric=alert_status)](https://sonarcloud.io/component_measures?id=najbartomasz_my-savings-logger&metric=qualitygates)


# my-savings-logger
Common logger used by **my-savings** project components.

## Usage

Install **my-savings-logger** package:

`npm install https://github.com/najbartomasz/my-savings-logger.git`

Import the package in the project:

* Node.js environment
```javascript
const { LoggerFactory } = require('my-savings-logger');

const loggerFactory = new LoggerFactory();
const logger = loggerFactory.create('Component');
logger.info('Some message.');
```

* Browser environment
```javascript
import { LoggerFactory } from 'my-savings-logger';

const loggerFactory = new LoggerFactory();
const logger = loggerFactory.create('Component');
logger.info('Some message.');
```
