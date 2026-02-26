import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  const animationStyles = `
    @keyframes barReveal {
      /* inset(120% ...) опускає межу маски нижче за саме обведення фігур, 
         тому стовпчики тепер зникатимуть ПОВНІСТЮ, без залишків. */
      0% { clip-path: inset(120% -5px -5px -5px); }
      10% { clip-path: inset(-5px -5px -5px -5px); } /* Стовпчики виросли */
      90% { clip-path: inset(-5px -5px -5px -5px); } /* 8 секунд повної статики */
      100% { clip-path: inset(120% -5px -5px -5px); } /* Швидко згорнулися */
    }

    .bar-animate {
      /* Загальний час розтягнуто до 10 секунд. 
         Тепер логотип "живий", але не відвертає на себе увагу від контенту. */
      animation: barReveal 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Затримки залишаємо короткими для красивої швидкої хвилі */
    .bar-delay-1 { animation-delay: 0.0s; }
    .bar-delay-2 { animation-delay: 0.15s; }
    .bar-delay-3 { animation-delay: 0.3s; }
  `;

  return (
    <span
      className={`inline-flex items-center text-gray-900 dark:text-white ${fontStyle}`}
    >
      <style>{animationStyles}</style>

      <svg
        className="mr-1 stroke-current text-primary-500"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />

        <rect
          x="3"
          y="12"
          width="6"
          height="8"
          rx="1"
          className="bar-animate bar-delay-1"
        />

        <rect
          x="9"
          y="8"
          width="6"
          height="12"
          rx="1"
          className="bar-animate bar-delay-2"
        />

        <rect
          x="15"
          y="4"
          width="6"
          height="16"
          rx="1"
          className="bar-animate bar-delay-3"
        />

        {/* Нижня базова лінія */}
        <path d="M4 20h14" />
      </svg>

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
