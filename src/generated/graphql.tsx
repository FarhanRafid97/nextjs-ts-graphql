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

export type EmailResponse = {
  __typename?: 'EmailResponse';
  error?: Maybe<Array<FieldError>>;
  linkEmail?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type FieldInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createPost: Post;
  createUser: UserResponse;
  deletePost: Scalars['String'];
  forgetPassword: EmailResponse;
  loginUser: UserResponse;
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: FieldInput;
};


export type MutationCreateUserArgs = {
  option: UsernamePasswordInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  input: FieldInput;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  isMorePost: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  points: Scalars['Float'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  myBio?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
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
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, status: number, message: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', title: string, text: string, points: number, creatorId: number, updatedAt: any, createdAt: any } };

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', forgetPassword: { __typename?: 'EmailResponse', linkEmail?: string | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  option: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string } | null, error?: Array<{ __typename?: 'FieldError', field: string, status: number, message: string }> | null } };

export type MyBioQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBioQuery = { __typename?: 'Query', myBio?: { __typename?: 'User', id: number, username: string } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', isMorePost: boolean, posts: Array<{ __typename?: 'Post', id: number, title: string, text: string, points: number, creatorId: number, createdAt: any }> } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  status
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  error {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $text: String!) {
  createPost(input: {title: $title, text: $text}) {
    title
    text
    points
    creatorId
    updatedAt
    createdAt
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgetPasswordDocument = gql`
    mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email) {
    linkEmail
    error {
      field
      status
      message
    }
  }
}
    `;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  loginUser(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($option: UsernamePasswordInput!) {
  createUser(option: $option) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MyBioDocument = gql`
    query MyBio {
  myBio {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMyBioQuery(options?: Omit<Urql.UseQueryArgs<MyBioQueryVariables>, 'query'>) {
  return Urql.useQuery<MyBioQuery>({ query: MyBioDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    isMorePost
    posts {
      id
      title
      text
      points
      creatorId
      createdAt
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};