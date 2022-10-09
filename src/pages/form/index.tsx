import React, { PureComponent } from 'react';
import styles from './styles.module.scss';

export default class Form extends PureComponent<
  Record<string, never>,
  {
    answer: {
      email: string | undefined;
      date: string | undefined;
      select: string | undefined;
      checkbox: boolean | undefined;
      switcher: boolean | undefined;
      file: FileList | undefined | null;
    };
    emailError: string | undefined;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef<HTMLInputElement>();
    this.date = React.createRef<HTMLInputElement>();
    this.select = React.createRef<HTMLSelectElement>();
    this.checkbox = React.createRef<HTMLInputElement>();
    this.switcher = React.createRef<HTMLInputElement>();
    this.file = React.createRef<HTMLInputElement>();
  }

  input: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  select: React.RefObject<HTMLSelectElement>;
  checkbox: React.RefObject<HTMLInputElement>;
  file: React.RefObject<HTMLInputElement>;
  switcher: React.RefObject<HTMLInputElement>;

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = {
      email: this.input.current?.value,
      date: this.date.current?.value,
      select: this.select.current?.value,
      checkbox: this.checkbox.current?.checked,
      switcher: this.switcher.current?.checked,
      file: this.file.current?.files,
    };
    this.emailHandler();
    await this.setState({ answer: result });
    /* 
    this.setState({ answer: { ...this.state.answer, date: this.date.current?.value } });
    this.setState({ answer: { ...this.state.answer, select: this.select.current?.value } });
    this.setState({ answer: { ...this.state.answer, checkbox: this.checkbox.current?.value } });
    this.setState({ answer: { ...this.state.answer, file: this.file.current?.files } });
    */
    console.log(this.state);
  }

  async emailHandler() {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(String(this.input.current?.value).toLowerCase())) {
      await this.setState({ emailError: 'Некорректный E-mail' });
    } else await this.setState({ emailError: '' });
  }

  render() {
    return (
      <div className={styles.main}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          {this.state && this.state['emailError'] && <h2>{this.state.emailError}</h2>}
          <label>
            E-mail:
            <input
              type="text"
              ref={this.input}
              className={styles.name}
              onChange={() => this.setState({ emailError: '' })}
            />
          </label>
          <label>
            Start date:
            <input type="date" defaultValue="2022-01-01" ref={this.date}></input>
          </label>
          <label>
            Select charater:
            <select ref={this.select}>
              <option value="Rick">Rick</option>
              <option value="Morty">Morty</option>
              <option value="Summer">Summer</option>
              <option value="Beth">Beth</option>
              <option value="Jerry">Jerry</option>
            </select>
          </label>
          <label>
            I agree to receive news by mail:
            <input type="checkbox" ref={this.checkbox}></input>
          </label>
          <label className={styles.switch}>
            Male/female:
            <input type="checkbox" ref={this.switcher}></input>
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <label>
            Select a file:
            <input type="file" id="myfile" name="myfile"></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
