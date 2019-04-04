import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function repositories(props?:any) {
    return <Col>

<h2>Creating the Repositories</h2>
<p>
  To be able to access the database we will import the Repository Layer provided by TypeORM. A repository will be needed for each entity. Please create a new folder called <code>repositories</code> inside the <code>server</code> folder and place these 4 files:
</p>
<CodeBlock>
  {`//my-project/src/server/repositories/userRepository.ts
  
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

export function userRepository() {
  return getConnection().getRepository(User);
}`}
  </CodeBlock>
  <CodeBlock>
    {`//my-project/src/server/repositories/articleRepository.ts

import { getConnection } from 'typeorm';
import { Article } from '../entities/Article';

export function articleRepository() {
  return getConnection().getRepository(Article);
}`}
  </CodeBlock>
<CodeBlock>
  {`//my-project/src/server/repositories/profileImageRepository.ts

import { getConnection } from 'typeorm';
import { ProfileImage } from '../entities/ProfileImage';

export function profileImageRepository() {
  return getConnection().getRepository(ProfileImage);
}
  `}</CodeBlock>
  
  <CodeBlock>
{`//my-project/src/server/repositories/roleRepository.ts

import { getConnection } from 'typeorm';
import { Role } from '../entities/Role';

export function roleRepository() {
  return getConnection().getRepository(Role);
}`}    
    </CodeBlock>
    <p>
    As we will see when building the controllers, these repositories will provide out of the box functions for accessing, creating, deleting and changing data in the database.
    </p>
</Col>
}