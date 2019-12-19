import React from 'react';
import cn from 'classnames';

import styles from './Plancard.module.css';
import Button from 'common/Button';

const PlanCard = ({ isScale }) => {
  return (
    <div className={cn(styles.Card, isScale && styles.MainCard)}>
      <div className={styles.CardTop}>
        {isScale && (
          <div className={styles.StarBlock}>
            <div className={styles.StarWrapper}>
              <div className={styles.Star}></div>
            </div>
            <div className={styles.StarBlockTriangle}></div>
          </div>
        )}
        <div className={styles.Title}>Wing extended Warranty</div>
        <div className={styles.PriceWrapper}>
          <div className={styles.PriceTitle}>Starting at</div>
          <div className={styles.Price}>$0.96</div>
        </div>
        <div className={styles.LinkWrapper}>
          <a href="#">Terms, fees, and more info</a>
        </div>
        <div className={styles.ButtonWrapper}>
          <Button>Select</Button>
        </div>
      </div>
      <div className={styles.CardBottom}>
        <div>Protect your device against</div>
        <ul className={styles.List}>
          <li className={styles.ListItem}>✔ Accidental damage</li>
          <li className={styles.ListItem}>✔ Loss and theft</li>
          <li className={styles.ListItem}>✔ Malfunction</li>
          <li className={styles.ListItem}>✔ Water damage</li>
          <li className={styles.ListItem}>✔ Broken screens</li>
        </ul>
        <div className={styles.Line}></div>
        <div className={styles.RepairWrapper}>
          <div>Repair deductible: $24.50</div>
          <div>Replacement deductible: $49.00</div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
