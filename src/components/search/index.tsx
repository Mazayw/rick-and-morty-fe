import styles from './styles.module.scss';
import React, { PureComponent } from 'react';

export default class Search extends PureComponent<
  { onChangeSearch: (text: string) => void; onClickSearch: (text: string) => void },
  { searchWord: string }
> {
  constructor(props: {
    onChangeSearch: (text: string) => void;
    onClickSearch: (text: string) => void;
  }) {
    super(props);
    this.state = { searchWord: '' };

    this.inputHandler = this.inputHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const value = localStorage.getItem('search');
    this.props.onChangeSearch(value ? value : '');
    this.setState({ searchWord: value ? value : '' });
  }

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
      console.log('object');
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
