import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function entities(props?:any) {
    return <Col>

    <h2>Creating the Entity Classes</h2>

    <p>
      Now that the project is running and the database connection was established you will learn how to create the entities with the support of typeORM that is an Object Relational Mapper. This library allows for the creation of Entities in a TypeScript Class that will be automatically mapped into a table in the database.
      Inside the <code>server</code> folder create a folder named <code>entities</code> and place these four files (It is good practice to name the Entities with the first letter capitalized eg. <code>User</code>):

    </p>

    <CodeBlock>
      {`//my-project/src/server/entities/User.ts

import { Article } from './Article';
import { 
  Entity, Column, PrimaryGeneratedColumn, 
  OneToMany, ManyToMany, JoinTable, OneToOne 
} from 'typeorm';
import{ Role } from './Role';
import { ProfileImage } from './ProfileImage';

@Entity('users') //  Name of the database table
export class User {

  // Auto generates an Id in database
  @PrimaryGeneratedColumn() 
  public id!: number;

  //  Add 'not null' constraint
  @Column({nullable: false}) 
  public firstName!: string;

  @Column({nullable: false})
  public lastName!: string;

  // Defines the property as unique
  @Column({nullable:false, unique: true}) 
  public email!: string;

  @Column({nullable: false})
  public password!: string;

  // A user can have many articles
  @OneToMany(type => Article, article => article.user)
  public articles!: Article;

  // A user can have many roles and a role can be assigned to many users
  @ManyToMany(type => Role, role => role.users)
  @JoinTable({
    name: 'user_roles', //  junction table name in database
    joinColumn: {name: 'userId'}, //  property name of the owner
    inverseJoinColumn: {name: 'roleId'} //  property name of the inverse relation
  })
  public roles!: Role[];

  @OneToOne(type => ProfileImage, profileImage => profileImage.user)
  public profileImage!: ProfileImage;

  public constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
      
      `}
    </CodeBlock>
    <CodeBlock>
{`//my-project/src/server/entities/Article.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity('articles') //  Name of the table in database
export class Article {
  // Auto generates an Id in database
  @PrimaryGeneratedColumn()
  public id!: number;

  // Add 'not null' constraint
  @Column({nullable: false})
  public title!: string;

  // Define the content to be of type 'long text'
  @Column({type: 'longtext'})
  public content!: string;

  @ManyToOne(
    type => User, user => user.articles, 
    {onDelete: 'CASCADE'} //  delete the association if user is deleted
  )
  public user!: User;

  public constructor(
    title: string,
    content: string,
  ){
    this.title = title;
    this.content = content;
  }
}
`}
      
    </CodeBlock>
    <CodeBlock>
{`//my-project/src/server/entities/ProfileImage.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('profile_images') //  Name of the table in database
export class ProfileImage {

  // Auto generates an Id in database
  @PrimaryGeneratedColumn()
  public id!: number;

  // Add 'not null' constraint
  @Column({nullable: false})
  public url!: string;

  @OneToOne(
    type => User, user => user.profileImage,
    {onDelete: 'CASCADE'} //  Deletes the association if user is deleted
  )
  @JoinColumn()
  public user!: User

  public constructor(
    url: string
  ){
    this.url = url;
  }
}
`}
    </CodeBlock>

    <CodeBlock>
{`//my-project/src/server/entities/Role.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { User } from './User';

@Entity('roles') //  name of table in database
export class Role {

  // Auto generates an Id in database
  @PrimaryGeneratedColumn()
  public id!: number;


  @Column({
    type: 'enum', //  declare the type as ENUM
    enum:['user', 'author', 'admin'], //  Property can only be one of them
    nullable: false, //  Not null constraint
    unique: true // Value must be unique
  })
  public name!: string;

  // A role can be assigned to many users and a user can have many roles
  @ManyToMany(type => User, user => user.roles)
  public users!: User[];

  public constructor(
    name: string
  ){
    this.name = name;
  }
}
`}
    </CodeBlock>
    <p>
    TypeORM provides many functionalities. In these files we have used some annotations to inform what configuration should be passed to the tables, columns and relationships:
    </p>
    <ul>
      <li>
      <code>@Entity</code> - Declares the class as an table. As an option we can pass the name of the table, if blanc the class name will be used.
      </li>
      <li>
      <code>@Column</code> - Declares the class properties as columns of the table. Many options can be passed through it, for more information see <a href="https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-options">TypeORM - Column Options</a>
      </li>
      <li>
      <code>@OneToOne</code> - Declares a one-to-one relationship between two tables. A foreign key is added in the table where it is declared. See more at <a href="https://github.com/typeorm/typeorm/blob/master/docs/one-to-one-relations.md">TypeORM - One To One Relations</a>
      </li>
      <li>
      <code>@ManyToOne</code> / <code>@OneToMany</code> - Declares a many-to-one / one-to-many relationship between two tables. The @ManyToOne annotation inserts a foreign key with the id of the associated table. See more at <a href="https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md">TypeORM - Many To One / One To Many Relations</a>
      </li>
      <li>
      <code>@ManyToMany</code> - Declares a many-to-many relationship between two tables. The owner table must have the @JoinTable annotation in its class. A junction with the combined name of the tables will be automaticaly created in the database, this name can be changed passing some options as we have seen in the code. When using the annotation in both sides of the relationship the bi-directional searching is enabled in the typeORM repository methods as we will see during the controllers creation. To see more access <a href="https://github.com/typeorm/typeorm/blob/master/docs/many-to-many-relations.md">TypeORM - Many To Many Relations</a>
      </li>
    </ul>
    <p>
    If you run the application now nothing will be created in the database, it is because we need to inform TypeORM which entities to map to the database.

    Open the <code>db.ts</code> file and import all the created entities and add them in the entities array inside the <code>createConnection</code> function:

    </p>
  <CodeBlock>
    {`//my-project/src/server/config/db.ts


import { createConnection, getConnectionManager } from "typeorm";
import{ User } from '../entities/User'; //  Add this line
import { Article } from '../entities/Article'; //  Add this line
import { Role } from '../entities/Role'; //  Add this line
import { ProfileImage } from '../entities/ProfileImage'; //  Add this line

export async function createDbConnection() {

  // Set database variables from environment
  const DATABASE_HOST = process.env.DATABASE_HOST;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_USER = process.env.DATABASE_USER;
  const DATABASE_DB = process.env.DATABASE_DB;

  // Create a database connection
  await createConnection({
    type: "mysql",
    host: DATABASE_HOST,
    port: 3306,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: [User, Article, Role, ProfileImage], //  Add this line
    synchronize: true,
  });

  // Check if connection is successful
  const connection = getConnectionManager();
  console.log('Is DB connected:', connection.connections[0].isConnected);

  // Create Roles (if non existent) on database connection
  try {
    const roleRepository = await connection.get('default').getRepository(Role);

    // If user role does not exist, create it
    if(! await roleRepository.findOne({where: {name: 'user'}})){
      await roleRepository.save({name:'user'});
    }

    // If author role does not exist, create it
    if(! await roleRepository.findOne({where: {name: 'author'}})){
      await roleRepository.save({name:'author'});
    }

    // If admin role does not exist, create it
    if(! await roleRepository.findOne({where:{name: 'admin'}})){
      await roleRepository.save({name:'admin'});
    }

  }catch(error){
    console.log(error);
  }
}
    
    `}
  </CodeBlock>
  <p>
  At this point you are able to run the application with the command <code>npm start</code> and check the created tables in your database:
  </p>

<CodeBlock>
  {`
mysql> describe articles; describe profile_images; describe roles; describe user_roles; describe users;

+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| title   | varchar(255) | NO   |     | NULL    |                |
| content | varchar(255) | NO   |     | NULL    |                |
| userId  | int(11)      | YES  | MUL | NULL    |                |
+---------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| id     | int(11)      | NO   | PRI | NULL    | auto_increment |
| url    | varchar(255) | NO   |     | NULL    |                |
| userId | int(11)      | YES  | UNI | NULL    |                |
+--------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

+-------+-------------------------------+------+-----+---------+----------------+
| Field | Type                          | Null | Key | Default | Extra          |
+-------+-------------------------------+------+-----+---------+----------------+
| id    | int(11)                       | NO   | PRI | NULL    | auto_increment |
| name  | enum('user','author','admin') | NO   |     | NULL    |                |
+-------+-------------------------------+------+-----+---------+----------------+
2 rows in set (0.01 sec)

+--------+---------+------+-----+---------+-------+
| Field  | Type    | Null | Key | Default | Extra |
+--------+---------+------+-----+---------+-------+
| userId | int(11) | NO   | PRI | NULL    |       |
| roleId | int(11) | NO   | PRI | NULL    |       |
+--------+---------+------+-----+---------+-------+
2 rows in set (0.00 sec)

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| firstName | varchar(255) | NO   |     | NULL    |                |
| lastName  | varchar(255) | NO   |     | NULL    |                |
| email     | varchar(255) | NO   | UNI | NULL    |                |
| password  | varchar(255) | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
  `}
</CodeBlock>
<p>
Note that the three Roles (<code>user</code>, <code>author</code> and <code>admin</code>) were already saved in the database as well:
</p>


<CodeBlock>
  {`
mysql> select * from roles;
+----+--------+
| id | name   |
+----+--------+
|  1 | user   |
|  2 | author |
|  3 | admin  |
+----+--------+
3 rows in set (0.00 sec)
`}
</CodeBlock>

<p>
Let's keep track of the project structure. It should be looking like this:
</p>
<img src='/images/structureAfterEntities.png' width='100%'></img>
</Col>
}
