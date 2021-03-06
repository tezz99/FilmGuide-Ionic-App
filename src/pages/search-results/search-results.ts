import { MovieDbProvider } from "./../../providers/movie-db/movie-db";
import { SearchResult } from "./../../models/searchResult.model";
import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Observable } from "rxjs";
import { MovieDetailPage } from "../movie-detail/movie-detail";

@IonicPage()
@Component({
    selector: "page-search-results",
    templateUrl: "search-results.html"
})
export class SearchResultsPage {
    searchResults$: Observable<SearchResult>[];
    searchQuery: string;

    itemLimit: number = 10;

    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private movieDbProvider: MovieDbProvider
    ) {
        this.searchResults$ = this.navParams.get("searchResultObservable");
        this.searchQuery = this.navParams.get("searchQuery");
    }

    openMovieDetail(movieId: string) {
        this.navCtrl.push(MovieDetailPage, {
            movieObservable: this.movieDbProvider.getMovieDetail(movieId),
            movieCastObservable: this.movieDbProvider.getMovieCredits(movieId),
            movieId: movieId
        });
    }

    doInfinite(infiniteScroll, totalItems) {
        console.log("Begin async operation");

        if (this.itemLimit > totalItems) {
            infiniteScroll.complete();
            return;
        }

        setTimeout(() => {
            this.itemLimit += 6;
            console.log("Async operation has ended");
            infiniteScroll.complete();
        }, 1000);
    }
}
