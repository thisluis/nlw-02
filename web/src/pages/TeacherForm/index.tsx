import React, { useState, FormEvent } from 'react'
import {useHistory} from 'react-router-dom'

import warningIcon from '../../assets/icons/warning.svg'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import api from '../../services/api'

const subjects =
[
    {value: 'Física', label: 'Física'},
    {value: 'Química', label: 'Química'},
    {value: 'Matemática', label: 'Matemática'},
    {value: 'Biologia', label: 'Biologia'},
    {value: 'Português', label: 'Português'},
    {value: 'Redação', label: 'Redação'},
    {value: 'Literature', label: 'Literature'},
    {value: 'Artes', label: 'Artes'},
    {value: 'História', label: 'História'},
    {value: 'Geografia', label: 'Geografia'},
    {value: 'Filosofia', label: 'Filosofia'},
    {value: 'Sociologia', label: 'Sociologia'},
]
const week_days =
[
    {value: '0', label: 'Domingo'},
    {value: '1', label: 'Segunda-feira'},
    {value: '2', label: 'Terça-feira'},
    {value: '3', label: 'Quarta-feira'},
    {value: '4', label: 'Quinta-feira'},
    {value: '5', label: 'Sexta-feira'},
    {value: '6', label: 'Sábado'}
]

interface ScheduleItem
{
    week_day: number
    from: string
    to: string
}

function TeacherForm()
{
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([{week_day: 0, from: '', to: ''}])

    const history = useHistory()

    function addNewScheduleItem()
    {
        setScheduleItems([...scheduleItems, {week_day: 0, from: '', to: ''}])
    }

    function setScheduledItemValue(position: number, field: string, value: string)
    {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) =>
        {
            if(index === position) return {...scheduleItem, [field]: value}
            else return scheduleItem
        })
        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent)
    {
        e.preventDefault()

        api.post('classes',
        {
            name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
        }).then(() =>
        {
            alert('Cadastro realizado com sucesso!')
            history.push('/')
        }).catch(() =>
        {
            alert('Erro no cadastro!')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            options={subjects}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select
                                    name="week_day"
                                    label="Dia da semana"
                                    options={week_days}
                                    value={scheduleItem.week_day}
                                    onChange={(e) => setScheduledItemValue(index, 'week_day', e.target.value)}
                                />
                                <Input
                                    name="from"
                                    label="De"
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={(e) => setScheduledItemValue(index, 'from', e.target.value)}
                                />
                                <Input
                                    name="to"
                                    label="Até"
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={(e) => setScheduledItemValue(index, 'to', e.target.value)}
                                />
                            </div>
                        ))}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm