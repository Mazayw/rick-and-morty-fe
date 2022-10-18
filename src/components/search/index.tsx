import styles from './styles.module.scss';
import React, { PureComponent } from 'react';

export default class Search extends PureComponent<
  {
    onChangeSearch: (text: string) => void;
    onClickSearch: (text: string) => void;
    getPageHandler: () => Promise<void>;
  },
  { searchWord: string }
> {
  constructor(props: {
    onChangeSearch: (text: string) => void;
    onClickSearch: (text: string) => void;
    getPageHandler: () => Promise<void>;
  }) {
    super(props);
    this.state = { searchWord: '' };

    this.inputHandler = this.inputHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = () => {
    const value = localStorage.getItem('search');
    if (value) {
      this.props.onChangeSearch(value);
      this.props.onClickSearch(value);
      this.setState({ searchWord: value });
    } else {
      this.props.getPageHandler();
    }
  };

  componentWillUnmount() {
    localStorage.setItem('search', this.state.searchWord);
  }

  inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this.setState({ searchWord: value });
    localStorage.setItem('search', value);
    this.props.onChangeSearch(e.target.value);
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.props.onClickSearch(this.state.searchWord);
    }
  }

  render() {
    return (
      <div className={styles['search-wrapper']}>
        <input
          className={styles.search}
          type="search"
          value={this.state.searchWord}
          onChange={this.inputHandler}
          placeholder="Search"
          name="search"
          onKeyDown={this.handleKeyDown}
        />
        <img
          src="./icons/search.svg"
          alt="Search icon"
          className={styles.icon}
          onClick={() => this.props.onChangeSearch(this.state.searchWord)}
        />
      </div>
    );
  }
}
