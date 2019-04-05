import React from 'react';
import Col from 'react-bootstrap/Col';

export function introduction(props?: any) {
    return <Col>
        <h2>
            Introduction
        </h2>

        <p>
            A Basic tutorial on how to build an API in node.js using TypeScript, express, TypeORM and MySQL Database.
        </p>
        <p className="lead">
            Prerequisites
        </p>
        <ul>
            <li><a href="https://nodejs.org">Node.js</a></li>
            <li><a href="https://gitforwindows.org/">Git Bash</a> (for windows users)</li>
            <li><a href="https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/">MySQL 5.7 Database</a></li>
        </ul>
        <p className="lead">
            Scenario
        </p>
        <p>
            In this tutorial we are going to build a simple blog where users will have roles, profile images and can create articles.
        </p>

        <p className="lead"> Database Schema</p>

        <img src='/images/databaseSchema.png' width='100%' />


    </Col>;
}

