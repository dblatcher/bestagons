import styles from './bestagon-components.module.css';

/* eslint-disable-next-line */
export interface BestagonComponentsProps {}

export function BestagonComponents(props: BestagonComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BestagonComponents!</h1>
    </div>
  );
}

export default BestagonComponents;
