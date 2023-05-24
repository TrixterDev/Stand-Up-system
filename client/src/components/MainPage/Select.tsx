import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import styles from "./MainPage.module.sass";

interface PropsSelect {
  name: string;
  options: any[];
  setOrderInfo: (data: any) => void;
  className: string;
}

export const Select: React.FC<PropsSelect> = ({
  name,
  options,
  setOrderInfo,
  className,
}) => {
  const [activeOption, setActiveOption] = useState(options[0]);

  const optionList = useMemo(() => options || [], [options]);

  const [customSelectStatus, setCustomSelectStatus] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveOption(e.target.value);
  };

  const hideOnClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setCustomSelectStatus(false);
    }
  };

  useMemo(() => {
    if (name === "delivery") {
      setOrderInfo((data: any) => {
        return {
          ...data,
          delivery: activeOption,
        };
      });
    }
  }, [activeOption, name, setOrderInfo]);

  return (
    <div ref={ref}>
      <div className={styles["custom-select-wrap"]}>
        <select name={name} onChange={handleSelectChange} value={activeOption}>
          {optionList.map((item, index) => {
            return (
              <option key={index} value={item} selected={item === activeOption}>
                {item}
              </option>
            );
          })}
        </select>

        <div className={clsx(styles["custom-select"], className && className)}>
          <div
            className={clsx(
              styles.activeValue,
              customSelectStatus && styles.active
            )}
            onClick={() => setCustomSelectStatus((status) => !status)}
          >
            {activeOption} <i className="icon-arrow-down"></i>
          </div>

          <div
            className={clsx(
              styles["custom-select-list"],
              customSelectStatus && styles.active
            )}
          >
            {optionList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles["select-list-item"]}
                  onClick={() => {
                    setActiveOption(item);
                    setCustomSelectStatus(false);
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
