import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password ) {
            token,
            user {
                username
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password ) {
            token,
            user {
                username
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String!], $description: String!, $title: String!, $bookId: ID!, $image: String!, $link: String!, $token: ID!) {
        saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link, token: $token) {
            username
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($email: String!, $password: String!) {
        removeBook(email: $email, password: $password ) {
            
        }
    }
`