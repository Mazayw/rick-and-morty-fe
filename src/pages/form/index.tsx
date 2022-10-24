import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ICardForm } from '../../components/interfaces';
import FormCard from '../../components/form-card/index';
import { useForm, SubmitHandler } from 'react-hook-form';

export default function Form() {
  // const [submitDisabled, setSubmitDisabled] = useState(false);
  const [cards, setCards] = useState<ICardForm[] | never>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardForm>({
    defaultValues: {
      email: '',
      date: '2022-01-01',
      select: '',
      checkbox: false,
      switcher: false,
      file: undefined,
      imagePreviewUrl: imagePreviewUrl,
    },
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<ICardForm> = (data: ICardForm, e) => {
    setCards((prev: ICardForm[] | never) => [
      ...prev,
      { ...data, imagePreviewUrl: imagePreviewUrl },
    ]);
    e?.target.reset();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files![0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles['form-data']}>
          E-mail:
          <input
            {...register('email', {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="text"
            className={styles.name}
            data-testid="email"
            required
          />
          {errors?.email?.type === 'pattern' && <h2>Invalid Email</h2>}
        </label>
        <label className={styles['form-data']}>
          Start date:
          <input
            type="date"
            {...register('date')}
            defaultValue="2022-01-01"
            data-testid="date"
            required
          ></input>
        </label>
        <label className={styles['form-data']}>
          Select charater:
          <select {...register('select')} data-testid="select" required>
            <option value="Rick">Rick</option>
            <option value="Morty">Morty</option>
            <option value="Summer">Summer</option>
            <option value="Beth">Beth</option>
            <option value="Jerry">Jerry</option>
          </select>
        </label>
        <label className={styles['form-data']}>
          I agree to receive news by mail:
          <input type="checkbox" {...register('checkbox')} data-testid="checkbox" required></input>
        </label>
        <div className={`${styles['switch-wrapper']} ${styles['form-data']}`}>
          I agree to receive advertisements:
          <label className={styles.switch}>
            <input type="checkbox" data-testid="switcher" {...register('switcher')}></input>
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <label className={styles['form-data']}>
          Select a file:
          <input
            {...register('file')}
            data-testid="file"
            type="file"
            id="myfile"
            name="myfile"
            accept=".jpg, .png, .jpeg"
            required
            onChange={(e) => handleImageChange(e)}
          ></input>
        </label>
        <input
          type="submit"
          value="Submit"
          data-testid="submit"
          // disabled={submitDisabled}
          className={styles.button}
        />
      </form>
      <div className={styles['cards-wrapper']}>
        {cards.length !== 0 &&
          cards.map((el, index) => <FormCard cardData={el} key={`${index}${el.email}`} />)}
      </div>
    </div>
  );
}
