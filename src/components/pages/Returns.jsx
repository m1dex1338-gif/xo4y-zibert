import React from 'react';
import { Link } from 'react-router-dom';

function Returns() {
  return (
    <>
      <ol className="section-banner py-3 position-relative mt-5">
        <li className="position-relative"><Link to="/">Головна</Link></li>
        <li className="position-relative active"><span className="ps-5">Повернення</span></li>
      </ol>

      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-5 text-center display-6">Обмін та Повернення</h1>
            
            <div className="content-box">
              <p className="text-muted lead mb-4">
                Ми цінуємо наших клієнтів і працюємо відповідно до чинного законодавства України, зокрема Закону «Про захист прав споживачів».
              </p>

              <h4 className="fw-bold mb-3 mt-5">1. Умови повернення товарів належної якості</h4>
              <p className="text-muted mb-3">Ви можете повернути або обміняти товар протягом <strong>14 днів</strong> з моменту покупки за наступних умов:</p>
              <ul className="text-muted mb-4">
                <li className="mb-2">Товар не був у використанні, на ньому відсутні сліди монтажу чи експлуатації (подряпини, сколи, плями).</li>
                <li className="mb-2">Збережено його товарний вигляд, споживчі властивості.</li>
                <li className="mb-2">Збережена оригінальна упаковка виробника без пошкоджень, всі ярлики та пломби.</li>
                <li className="mb-2">Є розрахунковий документ (чек або накладна), виданий при покупці.</li>
              </ul>
              <div className="alert alert-secondary border-0 p-4 rounded-4 mb-4">
                <strong>Важливо:</strong> Меблі, виготовлені під індивідуальне замовлення (нестандартні розміри, специфічні тканини тощо), обміну та поверненню не підлягають.
              </div>

              <h4 className="fw-bold mb-3 mt-5">2. Процедура повернення</h4>
              <p className="text-muted mb-4">Для оформлення заявки на повернення, будь ласка, зв'яжіться з нашим менеджером у Telegram або за номером телефону, вказаним на сторінці <Link to="/contact" className="text-dark fw-bold">Контакти</Link>. Далі:</p>
              <ol className="text-muted">
                <li className="mb-2">Відправте нам фото товару та упаковки для підтвердження.</li>
                <li className="mb-2">Доставте товар назад на склад (транспортні витрати несе покупець).</li>
                <li className="mb-2">Після огляду товару на складі, ми повертаємо кошти на ваш рахунок протягом 7 робочих днів.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Returns;
