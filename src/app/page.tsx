'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Building2, Truck, Package, Car, Phone, Mail, MapPin, Calendar, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    experience: '',
    message: ''
  })
  const [curriculo, setCurriculo] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Criar FormData para enviar arquivo
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('service', formData.service)
      formDataToSend.append('experience', formData.experience)
      formDataToSend.append('message', formData.message)
      
      if (curriculo) {
        formDataToSend.append('curriculo', curriculo)
      }

      const response = await fetch('/api/candidaturas', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        toast.success('Candidatura enviada com sucesso!', {
          description: 'Entraremos em contato em breve.',
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          experience: '',
          message: ''
        })
        setCurriculo(null)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao enviar candidatura')
      }
    } catch (error) {
      toast.error('Erro ao enviar candidatura', {
        description: error instanceof Error ? error.message : 'Por favor, tente novamente mais tarde.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-50 border-b-4 border-green-600">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">SOFTEC</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#sobre" className="hover:text-green-400 transition-colors">Sobre</a>
              <a href="#servicos" className="hover:text-green-400 transition-colors">Serviços</a>
              <a href="#candidaturas" className="hover:text-green-400 transition-colors">Candidaturas</a>
              <a href="#contato" className="hover:text-green-400 transition-colors">Contato</a>
              <a
                href="https://www.facilitafrota.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
              >
                FacilitaFrota
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-green-950 to-black text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-green-600 text-white border-green-500">Desde 2020</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Soluções Tecnológicas e
            <span className="text-green-500 block">Gestão de Frotas</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Profissionalismo e agilidade para atender às suas necessidades. Do Brasil a Portugal,
            levamos qualidade e compromisso em cada serviço.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#candidaturas">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                Fazer Candidatura
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600"></div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">Nossa História</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça a SOFTEC</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma trajetória de crescimento e inovação, levando qualidade e compromisso em cada serviço.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-2xl">2020 - O Início</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Fundada em Governador Valadares, Brasil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Assistência técnica de informática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Venda de produtos por licitação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Serviços gráficos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-2xl">2024 - Expansão</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Abertura da filial em Porto, Portugal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Expansão para gestão de frotas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Assistência técnica completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Encomendas express</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black text-white border-green-600">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center text-green-400">
                Palavra do CEO
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <div className="space-y-5 text-gray-300">
                <p className="text-lg">
                  <span className="text-white font-semibold">Álvaro Santos</span>
                  <span className="text-gray-400 ml-2">|</span>
                  <span className="text-gray-400">Fundador & CEO</span>
                </p>
                <p>
                  Aos <span className="text-white font-semibold">27 anos</span>, sou Técnico de Informática formado pelo Pronatec e natural de Governador Valadares, Minas Gerais.
                </p>
                <p>
                  Em <span className="text-white font-semibold">11 de maio de 2020</span>, aos <span className="text-white font-semibold">21 anos</span> tive a ousadia de transformar minha paixão por tecnologia em um negócio sólido fundei a SOFTEC GV com uma visão clara: entregar serviços de excelência em informática e soluções gráficas. Desde o início, compreendi que o sucesso exige ir além do tradicional – foi esse espírito inovador que impulsionou nosso crescimento.
                </p>
                <p>
                  Com o tempo, expandi nossos horizontes e incorporei as vendas por licitação ao nosso portfólio. Quando decidiu trazer essa visão para Portugal, redefini estratégias: mantivemos a essência dos serviços gráficos, mas concentramos nosso foco em licitações estaduais – uma oportunidade que permitiu operar com flexibilidade geográfica.
                </p>
                <p>
                  A chegada a Portugal marcou o início de um novo capítulo. Comecei realizando manutenção em terminais de pagamento automático, construindo uma base sólida através de trabalho árduo e dedicação. Essa jornada culminou na fundação da SOFTEC em Portugal, uma empresa que hoje representa síntese de experiência e inovação.
                </p>
                <p>
                  Hoje, nossa atuação em Portugal está estrategicamente voltada para o setor logístico, oferecendo soluções abrangentes que englobam gestão de frotas para logística alimentícia, transporte de pessoas, encomendas expressas e relocation de veículos.
                </p>
                <p className="text-gray-400 italic mt-4">
                  Cada serviço que realizamos reflete nosso compromisso com a qualidade, profissionalismo e a agilidade que nossos clientes demandam.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600 text-white">O Que Fazemos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluções completas para suas necessidades tecnológicas e logísticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Car className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Frota TVDE</CardTitle>
                <CardDescription>Gestão completa de frotas para transporte por aplicativo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Soluções integradas para motoristas de apps de transporte, com suporte técnico
                  e gestão eficiente da sua frota.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Estafetas de Delivery</CardTitle>
                <CardDescription>Entregas rápidas e confiáveis para seu negócio</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Serviço de estafetas profissionais para entregas em todo o território,
                  garantindo rapidez e segurança.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Encomendas Express</CardTitle>
                <CardDescription>Entregas urgentes com máxima agilidade</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Serviço de encomendas express para entregas prioritárias, com
                  rastreamento e garantia de entrega.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Vendas por Licitação</CardTitle>
                <CardDescription>Fornecimento de produtos via processos licitatórios</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Especialistas em vendas por licitação, fornecendo produtos de qualidade
                  para órgãos públicos e privados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Assistência Técnica</CardTitle>
                <CardDescription>Suporte especializado em tecnologia</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Assistência técnica de informática completa, manutenção de equipamentos
                  e suporte técnico especializado.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Serviços Gráficos</CardTitle>
                <CardDescription>Soluções completas em impressão e design</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Serviços gráficos profissionais, desde impressão até design, com
                  qualidade e prazos garantidos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-t-green-600">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Car className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Relocation de Veículos</CardTitle>
                <CardDescription>Serviços de transferência e relocation de veículos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Transferência segura e eficiente de veículos entre localidades, com
                  acompanhamento profissional e documentação completa.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-green-600 text-white border-0">
            <CardContent className="pt-6 text-center">
              <p className="text-xl font-semibold mb-2">
                Compromisso com a Excelência
              </p>
              <p className="text-green-100">
                Todos os nossos serviços são realizados com o máximo de profissionalismo e
                agilidade que o cliente precisa.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Candidaturas Form Section */}
      <section id="candidaturas" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600 text-white">Junte-se a Nós</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Formulário de Candidaturas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Deseja fazer parte da nossa equipe de gestão de frotas? Preencha o formulário abaixo!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle>Candidatura para Serviços de Frotas</CardTitle>
                <CardDescription>
                  Preencha seus dados para se candidatar às vagas disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+351 999 999 999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Serviço de Interesse *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tvde">Frota TVDE</SelectItem>
                          <SelectItem value="estafeta">Estafeta de Delivery</SelectItem>
                          <SelectItem value="encomendas">Encomendas Express</SelectItem>
                          <SelectItem value="relocation">Relocation de Veículos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experiência Prévia</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Descreva brevemente sua experiência"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem Adicional</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-nos mais sobre você..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="curriculo">Anexar Currículo (PDF, DOC, DOCX - Máx. 5MB)</Label>
                    <Input
                      id="curriculo"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setCurriculo(file)
                        }
                      }}
                      className="cursor-pointer"
                    />
                    {curriculo && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Arquivo selecionado: {curriculo.name}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-600 text-white border-green-500">Fale Conosco</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Estamos prontos para atendê-lo em Brasil e Portugal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <MapPin className="w-6 h-6" />
                  Brasil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Telefone</p>
                    <p className="font-semibold">+55 33 99130-4737</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">CNPJ</p>
                    <p className="font-semibold">37.112.806/0001-81</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Sede</p>
                    <p className="font-semibold">Governador Valadares - MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 text-white border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <MapPin className="w-6 h-6" />
                  Portugal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Telefone</p>
                    <p className="font-semibold">+351 934 474 316</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">NIPC</p>
                    <p className="font-semibold">518445160</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Filial</p>
                    <p className="font-semibold">Porto</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-green-600 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-green-500" />
                <span className="text-xl font-bold">SOFTEC</span>
              </div>
              <p className="text-gray-400 text-sm">
                Soluções tecnológicas e gestão de frotas com profissionalismo e agilidade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#sobre" className="text-gray-400 hover:text-green-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-green-400 transition-colors">Serviços</a></li>
                <li><a href="#candidaturas" className="text-gray-400 hover:text-green-400 transition-colors">Candidaturas</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-green-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Serviços</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Frota TVDE</li>
                <li>Estafetas de Delivery</li>
                <li>Encomendas Express</li>
                <li>Vendas por Licitação</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} SOFTEC. Todos os direitos reservados.</p>
            <p className="mt-2">Brasil: CNPJ 37.112.806/0001-81 | Portugal: NIPC 518445160</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
