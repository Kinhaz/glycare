import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import OptionsButton from './OptionsButton';
import ProgressBar from './ProgressBar';

const colors = {
  background: '#1B1B45',
  textPrimary: '#FFFFFF',
  textSecondary: '#B7B7DA',
  textMuted: '#8888B5',
};

const QUESTIONS = [
  {
    key: 'tipo_diabetes',
    question: 'Qual tipo de diabetes você tem?',
    options: ['Tipo 1', 'Tipo 2', 'Diabetes gestacional', 'Pré-diabetes ou não sei'],
  },
  {
    key: 'desafio_principal',
    question: 'Qual é o seu principal desafio no controle de diabetes?',
    options: ['Controlar a alimentação', 'Manter a glicemia estável', 'Fazer exercícios', 'Lembrar dos remédios'],
  },
  {
    key: 'frequencia_medicao',
    question: 'Com que frequência você mede sua glicemia?',
    options: ['Várias vezes ao dia', 'Uma vez ao dia', 'Algumas vezes por semana', 'Raramente ou nunca'],
  },
  {
    key: 'medicacao',
    question: 'Você toma algum medicamento para o diabetes?',
    options: ['Insulina', 'Comprimidos', 'Insulina e comprimidos', 'Nenhum'],
  },
  {
    key: 'alimentacao',
    question: 'Como você descreveria sua alimentação atual?',
    options: ['Saudável e balanceada', 'Preciso melhorar bastante', 'Sigo uma dieta específica', 'Não sei avaliar'],
  },
  {
    key: 'atividade_fisica',
    question: 'Com que frequência você pratica atividades físicas?',
    options: ['Diariamente', 'Algumas vezes por semana', 'Raramente', 'Nunca'],
  },
  {
    key: 'dificuldade_lembrar',
    question: 'Você tem dificuldade para lembrar de tomar remédios ou insulina?',
    options: ['Sim, frequentemente', 'Às vezes', 'Raramente', 'Não uso medicação'],
  },
  {
    key: 'sono',
    question: 'Como está a qualidade do seu sono geralmente?',
    options: ['Durmo bem', 'Durmo mal às vezes', 'Durmo mal com frequência', 'Não sei avaliar'],
  },
  {
    key: 'notificacoes',
    question: 'Você gostaria de receber lembretes do aplicativo?',
    options: ['Sim, lembretes de glicemia', 'Sim, lembretes de remédios', 'Sim, ambos', 'Prefiro não receber'],
  },
  {
    key: 'objetivo',
    question: 'Qual é o seu maior objetivo com o aplicativo?',
    options: ['Estabilizar minha glicemia', 'Perder peso', 'Ter mais controle na rotina', 'Aprender mais sobre diabetes'],
  },
];

export default function QuestionnaireScreen({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;

  const handleSelectOption = (optionLabel) => {
    const updatedAnswers = { ...answers, [currentQuestion.key]: optionLabel };
    setAnswers(updatedAnswers);

    if (currentIndex === totalQuestions - 1) {
      onFinish(updatedAnswers);
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentIndex === 0}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backArrow, currentIndex === 0 && styles.backArrowDisabled]}>
            {'←'}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressWrapper}>
          <Text style={styles.progressLabel}>
            {`Pergunta ${currentIndex + 1} de ${totalQuestions}`}
          </Text>
          <ProgressBar progress={(currentIndex + 1) / totalQuestions} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsList}>
          {currentQuestion.options.map((option, index) => (
            <OptionsButton
              key={option}
              label={option}
              index={index}
              selected={answers[currentQuestion.key] === option}
              onPress={() => handleSelectOption(option)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  backButton: { marginRight: 16, paddingVertical: 4, paddingHorizontal: 2 },
  backArrow: { color: colors.textPrimary, fontSize: 22 },
  backArrowDisabled: { color: colors.textMuted },
  progressWrapper: { flex: 1 },
  progressLabel: { color: colors.textSecondary, fontSize: 12, marginBottom: 8 },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
  question: { color: colors.textPrimary, fontSize: 24, fontWeight: '700', lineHeight: 32, marginBottom: 32 },
  optionsList: { width: '100%' },
});