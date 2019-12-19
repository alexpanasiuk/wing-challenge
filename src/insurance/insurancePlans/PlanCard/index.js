import React from 'react';
import cn from 'classnames';
import * as routes from 'app/routes';
import Button from 'common/Button';

import styles from './Plancard.module.css';

const PlanCard = ({ plan, isScale, goToConfirmPage }) => {
  if (!plan) {
    return null;
  }

  const { id, price, repair_deductible, replacement_deductible, sku, name } = plan;
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
        <div className={styles.Title}>{name}</div>
        <div className={styles.PriceWrapper}>
          <div className={styles.PriceTitle}>Starting at</div>
          <div className={styles.Price}>${price}</div>
        </div>
        <div className={styles.LinkWrapper}>
          <a href="#">Terms, fees, and more info</a>
        </div>
        <div className={styles.ButtonWrapper}>
          <Button isLink={true} to={goToConfirmPage(id)}>
            Select
          </Button>
        </div>
      </div>
      <div className={styles.CardBottom}>
        <div>Protect your device against</div>
        <ul className={styles.List}>
          {planList(sku).map((item, i) => (
            <li className={styles.ListItem} key={i}>
              <span className={styles.Tick}>✔</span>
              {item}
            </li>
          ))}
        </ul>
        <div className={styles.Line}></div>
        <div className={styles.RepairWrapper}>
          <div>Repair deductible: ${repair_deductible}</div>
          <div>Replacement deductible: ${replacement_deductible}</div>
        </div>
      </div>
    </div>
  );
};

const planList = sku => {
  switch (sku) {
    case 'WEW':
      return ["Malfunction (after the original manufacturer's warranty expires)"];
    case 'WDP3P':
    case 'WDPP5P':
      return ['Accidental damage', 'Loss and theft', 'Malfunction', 'Water damage', 'Broken screens'];
    default:
      return [];
  }
};

export default PlanCard;
