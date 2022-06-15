import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: UserResponse;
  deletePost: Scalars['String'];
  loginUser: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  age: Scalars['Float'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};


export type MutationCreateUserArgs = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  option: UsernamePasswordInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginUserArgs = {
  option: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  age?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  age: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  myBio?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null } };


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  createUser(option: {username: $username, password: $password}) {
    user {
      id
      username
    }
    error {
      field
      status
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};