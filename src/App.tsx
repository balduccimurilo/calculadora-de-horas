import { useState } from 'react';
import './App.css';
import { FaClock } from 'react-icons/fa';

type ResultType = {
  initialTime: string;
  intervalHours: string;
  intervalMinutes: string;
  intervalSeconds: string;
  formattedDate: string;
  formattedTime: string;
};

function App() {
  const [initialTime, setInitialTime] = useState('');
  const [intervalHours, setIntervalHours] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState('');
  const [intervalSeconds, setIntervalSeconds] = useState('');
  const [result, setResult] = useState<ResultType | null>(null);
  const [theme, setTheme] = useState('light'); // Estado para o tema

  const calculateTime = () => {
    if (
      !initialTime ||
      intervalHours === '' ||
      intervalMinutes === '' ||
      intervalSeconds === ''
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Separar horas e minutos da hora inicial
    const [initialHours, initialMinutes] = initialTime.split(':').map(Number);

    // Converter os valores do intervalo para números
    const intervalHoursNum = Number(intervalHours);
    const intervalMinutesNum = Number(intervalMinutes);
    const intervalSecondsNum = Number(intervalSeconds);

    if (
      isNaN(initialHours) ||
      isNaN(initialMinutes) ||
      isNaN(intervalHoursNum) ||
      isNaN(intervalMinutesNum) ||
      isNaN(intervalSecondsNum)
    ) {
      alert('Por favor, insira valores numéricos válidos.');
      return;
    }

    // Criar um objeto Date com a data e hora iniciais
    const now = new Date();
    now.setHours(initialHours);
    now.setMinutes(initialMinutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // Adicionar o intervalo de horas, minutos e segundos
    const totalSeconds =
      intervalHoursNum * 3600 + intervalMinutesNum * 60 + intervalSecondsNum;
    now.setSeconds(now.getSeconds() + totalSeconds);

    // Formatar a data e hora resultantes
    const options = {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
    };
    const formattedDate = now.toLocaleDateString('pt-BR', options);

    const formattedTime = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Armazenar o resultado
    setResult({
      initialTime,
      intervalHours,
      intervalMinutes,
      intervalSeconds,
      formattedDate,
      formattedTime,
    });
  };

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Botão para alternar o tema */}
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Alternar para tema {theme === 'light' ? 'escuro' : 'claro'}
      </button>

      {/* Ícone de relógio */}
      <div className="header">
        <FaClock className="clock-icon" size={160} color='#007bff'/>
      </div>

      <h1>Calculadora de Horas</h1>

      {/* Container do Formulário */}
      <div className="form-container">
        <div className="form-group">
          <label>Hora inicial (HH:MM):</label>
          <input
            type="time"
            value={initialTime}
            onChange={(e) => setInitialTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Intervalo:</label>
          <div className="interval-inputs">
            <input
              type="number"
              placeholder="Horas"
              value={intervalHours}
              onChange={(e) => setIntervalHours(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minutos"
              value={intervalMinutes}
              onChange={(e) => setIntervalMinutes(e.target.value)}
            />
            <input
              type="number"
              placeholder="Segundos"
              value={intervalSeconds}
              onChange={(e) => setIntervalSeconds(e.target.value)}
            />
          </div>
        </div>
        <button className="calculate-button" onClick={calculateTime}>
          Calcular
        </button>
      </div>

      {result && (
        <div className="result">
          <p>
            A partir de <strong>{result.initialTime}</strong>, adicionando um intervalo de{' '}
            <strong>
              {result.intervalHours}h {result.intervalMinutes}m {result.intervalSeconds}s
            </strong>
            , a data e hora resultantes serão:
          </p>
          <p>
            <strong>{result.formattedDate}</strong> às{' '}
            <strong>{result.formattedTime}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
