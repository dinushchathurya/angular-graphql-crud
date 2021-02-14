import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';

const GET_QUOTES = gql `
  {
    quotes {
      quotes {
        _id
        quotes
        author
      }
    }
  }
` ;

const CREATE_QUOTE = gql`
  mutation createQuote($quote: String!, $author: String!) {
    createQuote(quoteInput: { quote: $quote, author: $author }) {
      _id
      quote
      author
    }
  }
`;

const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      _id
      quote
      author
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';

  quotes: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.quotes = this.apollo.watchQuery({
      query: GET_QUOTES
    }).valueChanges.pipe(
      map((result: any) => {
        return result.data.quotes.quotes;
      })
    );
  }

  create(quote: string, author: string) {
    this.apollo
      .mutate({
        mutation: CREATE_QUOTE,
        refetchQueries: [{ query: GET_QUOTES }],
        variables: {
          quote,
          author,
        },
      })
      .subscribe(() => {
        console.log('created');
      });
  }

  delete(id: string) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: DELETE_QUOTE,
        refetchQueries: [{ query: GET_QUOTES }],
        variables: {
          id,
        },
      })
      .subscribe(() => {
        console.log('deleted');
      });
  }
}
