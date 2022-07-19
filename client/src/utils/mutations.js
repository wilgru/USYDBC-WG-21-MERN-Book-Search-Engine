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
    mutation saveBook($bookId: ID!, $authors: [String!], $title: String!, $description: String, $image: String) {
        saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
            username
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`