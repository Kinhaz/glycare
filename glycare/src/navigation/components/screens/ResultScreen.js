import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const colors = {
  background: '#1B1B45',
  cardBackground: '#26265C',
  optionBorder: '#3A3A78',
  accent: '#4DDFD8',
  textPrimary: '#FFFFFF',
  textSecondary: '#B7B7DA',
};

function buildRecommendations(answers) {
  const recs = [];

  switch (answers.tipo_diabetes) {
    case 'Tipo 1':
      recs.push({ title: 'Monitoramento intensivo de glicemia', description: 'Lembretes de medição e contagem de carboidratos para ajustar sua insulina.' });
      break;
    case 'Tipo 2':
      recs.push({ title: 'Controle de rotina', description: 'Foco em alimentação, exercícios e lembretes de medicação no dia a dia.' });
      break;
    case 'Diabetes gestacional':
      recs.push({ title: 'Acompanhamento da gestação', description: 'Metas de glicemia e alimentação adaptadas para essa fase da gravidez.' });
      break;
    default:
      recs.push({ title: 'Conteúdo educativo e prevenção', description: 'Conteúdos educativos e lembretes para exames de acompanhamento.' });
  }

  switch (answers.desafio_principal) {
    case 'Controlar a alimentação':
      recs.push({ title: 'Diário alimentar inteligente', description: 'Registre refeições e receba sugestões de trocas mais saudáveis.' });
      break;
    case 'Manter a glicemia estável':
      recs.push({ title: 'Gráficos de glicemia', description: 'Evolução da glicemia com alertas quando sair da faixa ideal.' });
      break;
    case 'Fazer exercícios':
      recs.push({ title: 'Treinos adaptados', description: 'Atividades físicas seguras para quem tem diabetes.' });
      break;
    case 'Lembrar dos remédios':
      recs.push({ title: 'Alarmes de medicação', description: 'Notificações no horário certo para cada remédio ou insulina.' });
      break;
  }

  if (answers.frequencia_medicao === 'Raramente ou nunca') {
    recs.push({ title: 'Lembretes para medir a glicemia', description: 'Lembretes leves para criar o hábito aos poucos.' });
  }

  if (answers.alimentacao === 'Preciso melhorar bastante' || answers.alimentacao === 'Não sei avaliar') {
    recs.push({ title: 'Cardápios e receitas para diabetes', description: 'Cardápios simples pensados para o controle da glicemia.' });
  }

  if (answers.atividade_fisica === 'Raramente' || answers.atividade_fisica === 'Nunca') {
    recs.push({ title: 'Metas leves de movimento', description: 'Metas pequenas de caminhada e alongamento, aumentando aos poucos.' });
  }

  if (answers.dificuldade_lembrar === 'Sim, frequentemente' || answers.dificuldade_lembrar === 'Às vezes') {
    recs.push({ title: 'Assistente de rotina de remédios', description: 'Lembretes recorrentes e um checklist diário de medicação.' });
  }

  if (answers.sono === 'Durmo mal às vezes' || answers.sono === 'Durmo mal com frequência') {
    recs.push({ title: 'Dicas para melhorar o sono', description: 'Como o sono afeta a glicemia e hábitos para dormir melhor.' });
  }

  if (answers.notificacoes && answers.notificacoes !== 'Prefiro não receber') {
    recs.push({ title: 'Notificações personalizadas ativadas', description: 'Você vai receber os lembretes escolhidos no horário mais adequado.' });
  }

  switch (answers.objetivo) {
    case 'Estabilizar minha glicemia':
      recs.push({ title: 'Painel de estabilidade glicêmica', description: 'Mostra o quão estável está sua glicemia na semana.' });
      break;
    case 'Perder peso':
      recs.push({ title: 'Acompanhamento de peso e metas', description: 'Cruza peso, alimentação e atividade física para emagrecer com segurança.' });
      break;
    case 'Ter mais controle na rotina':
      recs.push({ title: 'Rotina diária organizada', description: 'Agenda única com medição, remédios, refeições e exercícios.' });
      break;
    case 'Aprender mais sobre diabetes':
      recs.push({ title: 'Trilha de aprendizado sobre diabetes', description: 'Conteúdos curtos e confiáveis sobre a sua condição.' });
      break;
  }

  return recs;
}

export default function ResultScreen({ answers, onRestart, onContinue }) {
  const recommendations = buildRecommendations(answers);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>{answers.tipo_diabetes || 'Diabetes'}</Text>
        <Text style={styles.title}>Suas recomendações personalizadas</Text>
        <Text style={styles.subtitle}>
          Com base nas suas respostas, preparamos estas recomendações para o seu dia a dia.
        </Text>

        <View style={styles.list}>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{rec.title}</Text>
              <Text style={styles.cardDescription}>{rec.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.primaryButtonText}>Começar a usar o app</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onRestart}>
          <Text style={styles.secondaryButtonText}>Refazer questionário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24 },
  eyebrow: { color: colors.accent, fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '700', lineHeight: 33, marginBottom: 10 },
  subtitle: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 28 },
  list: { width: '100%' },
  card: { backgroundColor: colors.cardBackground, borderRadius: 18, borderWidth: 1, borderColor: colors.optionBorder, padding: 18, marginBottom: 14 },
  cardTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardDescription: { color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  footer: { paddingHorizontal: 24, paddingVertical: 18 },
  primaryButton: { backgroundColor: colors.accent, borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginBottom: 10 },
  primaryButtonText: { color: colors.background, fontSize: 15, fontWeight: '700' },
  secondaryButton: { alignItems: 'center', paddingVertical: 10 },
  secondaryButtonText: { color: colors.textSecondary, fontSize: 13, fontWeight: '500' },
});