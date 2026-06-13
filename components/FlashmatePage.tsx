import React, { useMemo, useState } from 'react';

type FlashmatePageProps = {
  onBack: () => void;
};

type FlashmateView = 'access' | 'admin';
type AssignmentStatus = 'asignada' | 'pendiente' | 'hecha';

type Student = {
  id: string;
  name: string;
  level: string;
  plan: string;
  currentUnit: string;
  lastActivity: string;
};

type Guide = {
  id: string;
  code: string;
  title: string;
  unit: string;
  link: string;
};

type StudentAssignment = {
  id: string;
  studentId: string;
  guideId: string;
  status: AssignmentStatus;
  assignedAt: string;
};

const accessCards = [
  {
    href: '/flashmate/portal-estudiante.html',
    icon: 'menu_book',
    label: 'Estudiante',
    title: 'Mi portal',
    description: 'Accede a tu guia de hoy, revisa tu avance y manten la practica activa entre clases.',
    cta: 'Entrar como estudiante',
    color: '#ED3B62',
    bg: 'bg-red-50',
  },
  {
    href: '/flashmate/panel-docente.html',
    icon: 'folder_managed',
    label: 'Docente',
    title: 'Panel de gestion',
    description: 'Planifica guias, asigna actividades y revisa el progreso de tus estudiantes.',
    cta: 'Entrar como docente',
    color: '#38388E',
    bg: 'bg-indigo-50',
  },
];

const topStats = [
  { value: '100', label: 'guias activas' },
  { value: '1000', label: 'ejercicios meta' },
  { value: '4', label: 'ejes de aprendizaje' },
  { value: '16', label: 'unidades' },
];

const initialStudents: Student[] = [
  {
    id: 'st-1',
    name: 'Valentina Torres',
    level: 'Nivel A',
    plan: 'Plan individual',
    currentUnit: 'Unidad 01',
    lastActivity: 'Hoy · 08:30',
  },
  {
    id: 'st-2',
    name: 'Matias Rojas',
    level: 'Nivel B',
    plan: 'Plan PAES',
    currentUnit: 'Unidad 02',
    lastActivity: 'Ayer · 19:10',
  },
  {
    id: 'st-3',
    name: 'Camila Soto',
    level: 'Nivel A',
    plan: 'Plan individual',
    currentUnit: 'Unidad 01',
    lastActivity: 'Ayer · 17:40',
  },
  {
    id: 'st-4',
    name: 'Diego Fuentes',
    level: 'Nivel C',
    plan: 'Plan reforzamiento',
    currentUnit: 'Unidad 03',
    lastActivity: 'Hace 3 dias',
  },
];

const initialGuides: Guide[] = [
  {
    id: 'g-1',
    code: 'U01.A.1a',
    title: 'Conjuntos numericos',
    unit: 'Unidad 01',
    link: '/flashmate/guia-U01.A.1a.html',
  },
  {
    id: 'g-2',
    code: 'U01.B.4a',
    title: 'Numeros enteros',
    unit: 'Unidad 01',
    link: '/flashmate/guia-U01.B.4a.html',
  },
  {
    id: 'g-3',
    code: 'U02.A.2b',
    title: 'Porcentajes y variaciones',
    unit: 'Unidad 02',
    link: '/flashmate/guia-U02.A.2b.html',
  },
  {
    id: 'g-4',
    code: 'U03.B.7c',
    title: 'Raices enesimas',
    unit: 'Unidad 03',
    link: '/flashmate/guia-U03.B.7c.html',
  },
];

const initialAssignments: StudentAssignment[] = [
  { id: 'a-1', studentId: 'st-1', guideId: 'g-1', status: 'hecha', assignedAt: '21/04' },
  { id: 'a-2', studentId: 'st-1', guideId: 'g-2', status: 'pendiente', assignedAt: '24/04' },
  { id: 'a-3', studentId: 'st-2', guideId: 'g-3', status: 'asignada', assignedAt: '27/04' },
  { id: 'a-4', studentId: 'st-3', guideId: 'g-1', status: 'hecha', assignedAt: '20/04' },
  { id: 'a-5', studentId: 'st-3', guideId: 'g-2', status: 'hecha', assignedAt: '25/04' },
  { id: 'a-6', studentId: 'st-4', guideId: 'g-4', status: 'pendiente', assignedAt: '22/04' },
];

const statusTone: Record<AssignmentStatus, string> = {
  asignada: 'bg-sky-100 text-sky-700',
  pendiente: 'bg-amber-100 text-amber-700',
  hecha: 'bg-emerald-100 text-emerald-700',
};

const statusLabel: Record<AssignmentStatus, string> = {
  asignada: 'Asignada',
  pendiente: 'Pendiente',
  hecha: 'Hecha',
};

const FlashmatePage: React.FC<FlashmatePageProps> = ({ onBack }) => {
  const [view, setView] = useState<FlashmateView>('access');
  const [students] = useState<Student[]>(initialStudents);
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [assignments, setAssignments] = useState<StudentAssignment[]>(initialAssignments);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudents[0].id);
  const [selectedGuideId, setSelectedGuideId] = useState<string>(initialGuides[0].id);
  const [newGuide, setNewGuide] = useState({ code: '', title: '', unit: '', link: '' });
  const [saveMessage, setSaveMessage] = useState('Sin cambios recientes');

  const selectedStudent = students.find((student) => student.id === selectedStudentId) ?? students[0];

  const guideMap = useMemo(
    () => Object.fromEntries(guides.map((guide) => [guide.id, guide])),
    [guides],
  );

  const assignmentsByStudent = useMemo(() => {
    return students.map((student) => {
      const items = assignments.filter((assignment) => assignment.studentId === student.id);
      const done = items.filter((assignment) => assignment.status === 'hecha').length;
      const pending = items.filter((assignment) => assignment.status === 'pendiente').length;
      const assigned = items.filter((assignment) => assignment.status === 'asignada').length;
      const latest = items[items.length - 1];
      const latestGuide = latest ? guideMap[latest.guideId] : null;

      let overall: 'al dia' | 'pendiente' | 'atrasado' = 'al dia';
      if (pending > 1) overall = 'atrasado';
      else if (pending > 0 || assigned > 0) overall = 'pendiente';

      return {
        student,
        items,
        done,
        pending,
        assigned,
        overall,
        latestGuide,
      };
    });
  }, [assignments, guideMap, students]);

  const selectedStudentData =
    assignmentsByStudent.find((entry) => entry.student.id === selectedStudentId) ?? assignmentsByStudent[0];

  const studentsWithPending = assignmentsByStudent.filter((entry) => entry.pending > 0).length;
  const studentsWithoutGuide = assignmentsByStudent.filter((entry) => entry.items.length === 0).length;
  const lateStudents = assignmentsByStudent.filter((entry) => entry.overall === 'atrasado').length;

  const latestAssigned = [...assignments]
    .slice(-3)
    .reverse()
    .map((assignment) => {
      const student = students.find((item) => item.id === assignment.studentId);
      const guide = guides.find((item) => item.id === assignment.guideId);
      return { assignment, student, guide };
    });

  const alerts = [
    studentsWithoutGuide > 0
      ? `${studentsWithoutGuide} estudiante${studentsWithoutGuide > 1 ? 's' : ''} sin guia actual`
      : 'Todos los estudiantes tienen al menos una guia asignada',
    lateStudents > 0
      ? `${lateStudents} estudiante${lateStudents > 1 ? 's' : ''} con avance atrasado`
      : 'No hay estudiantes en estado atrasado',
    `${studentsWithPending} estudiante${studentsWithPending > 1 ? 's' : ''} con pendientes por revisar`,
  ];

  const addGuide = () => {
    if (!newGuide.code.trim() || !newGuide.unit.trim() || !newGuide.link.trim()) {
      setSaveMessage('Completa codigo, unidad y link para subir una guia');
      return;
    }

    const nextGuide: Guide = {
      id: `g-${guides.length + 1}`,
      code: newGuide.code.trim(),
      title: newGuide.title.trim() || newGuide.code.trim(),
      unit: newGuide.unit.trim(),
      link: newGuide.link.trim(),
    };

    setGuides((current) => [nextGuide, ...current]);
    setSelectedGuideId(nextGuide.id);
    setNewGuide({ code: '', title: '', unit: '', link: '' });
    setSaveMessage(`Guia ${nextGuide.code} agregada a la biblioteca`);
  };

  const assignSelectedGuide = () => {
    const existing = assignments.find(
      (assignment) => assignment.studentId === selectedStudentId && assignment.guideId === selectedGuideId,
    );

    if (existing) {
      setSaveMessage('Esa guia ya esta asignada a este estudiante');
      return;
    }

    const nextAssignment: StudentAssignment = {
      id: `a-${assignments.length + 1}`,
      studentId: selectedStudentId,
      guideId: selectedGuideId,
      status: 'asignada',
      assignedAt: 'Hoy',
    };

    setAssignments((current) => [...current, nextAssignment]);
    setSaveMessage(`Guia asignada a ${selectedStudent.name}`);
  };

  const updateAssignmentStatus = (assignmentId: string, status: AssignmentStatus) => {
    setAssignments((current) =>
      current.map((assignment) => (assignment.id === assignmentId ? { ...assignment, status } : assignment)),
    );
    setSaveMessage('Estado actualizado en la interfaz');
  };

  const adminMetricCards = [
    { label: 'Estudiantes activos', value: String(students.length), tone: 'text-[#38388E]' },
    { label: 'Con pendientes', value: String(studentsWithPending), tone: 'text-[#ED3B62]' },
    { label: 'Guias en biblioteca', value: String(guides.length), tone: 'text-[#0187F3]' },
    { label: 'Ultimas asignaciones', value: String(latestAssigned.length), tone: 'text-emerald-600' },
  ];

  const adminView = (
    <div className="min-h-screen bg-[#F3F6FF] text-[#1a1a2e]">
      <header className="sticky top-0 z-50 border-b border-[#dbe4ff] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 sm:px-8 lg:px-10 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#0187F3]">
              Centro de gestion Erika
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-[#1a1a2e] sm:text-3xl">
              FlashMate para coordinar, no para complicar
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Aqui Erika ve estudiantes, detecta pendientes, sube links de nuevas guias y asigna rapido sin duplicar la planificacion docente ni el seguimiento detallado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setView('access')}
              className="rounded-full border border-[#d7def7] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#38388E] transition-all hover:border-[#38388E]/30 hover:bg-[#EEF0F8]"
            >
              Volver a FlashMate
            </button>
            <a
              href="/flashmate/panel-docente.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#38388E] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white no-underline shadow-lg shadow-[#38388E]/20 transition-all hover:bg-[#2c2c73]"
            >
              Abrir panel docente
            </a>
            <a
              href="/flashmate/panel-seguimiento.html"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0187F3] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white no-underline shadow-lg shadow-[#0187F3]/20 transition-all hover:bg-[#006fc9]"
            >
              Ver seguimiento
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminMetricCards.map((card) => (
            <article key={card.label} className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(56,56,142,0.08)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{card.label}</p>
              <p className={`mt-3 text-4xl font-extrabold ${card.tone}`}>{card.value}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(56,56,142,0.08)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ED3B62]">Resumen operativo</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a2e]">Que necesita atencion hoy</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Una vista rapida para decidir a quien asignar, a quien revisar y cuando conviene abrir la planificacion o el seguimiento completo.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#EEF0F8] px-4 py-3 text-sm font-semibold text-[#38388E]">
                  {saveMessage}
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {alerts.map((alert) => (
                  <div key={alert} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {alert}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {latestAssigned.map((item) => (
                  <div key={item.assignment.id} className="rounded-[22px] border border-[#dbe4ff] bg-[#F8FBFF] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#0187F3]">Ultima asignacion</p>
                    <p className="mt-2 text-sm font-extrabold text-[#1a1a2e]">{item.student?.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.guide?.code} · {item.guide?.title}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{item.assignment.assignedAt}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(56,56,142,0.08)]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#38388E]">Estudiantes</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a2e]">Vista simple por alumno</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Elige un estudiante y trabaja solo con lo importante: como va y que guia necesita ahora.
                </p>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="overflow-hidden rounded-[24px] border border-slate-200">
                  <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr] bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <span>Estudiante</span>
                    <span>Estado</span>
                    <span className="text-right">Pend.</span>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {assignmentsByStudent.map((entry) => (
                      <button
                        key={entry.student.id}
                        onClick={() => setSelectedStudentId(entry.student.id)}
                        className={`grid w-full grid-cols-[1.2fr_0.7fr_0.6fr] items-center gap-3 px-4 py-4 text-left transition-all ${
                          entry.student.id === selectedStudentId
                            ? 'bg-[#EEF6FF]'
                            : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-[#1a1a2e]">{entry.student.name}</p>
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {entry.latestGuide ? entry.latestGuide.code : 'Sin guia actual'}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                              entry.overall === 'al dia'
                                ? 'bg-emerald-100 text-emerald-700'
                                : entry.overall === 'pendiente'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            {entry.overall}
                          </span>
                        </div>
                        <div className="text-right text-sm font-extrabold text-[#1a1a2e]">
                          {entry.pending + entry.assigned}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#dbe4ff] bg-[#F8FBFF] p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#1a1a2e]">{selectedStudentData.student.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {selectedStudentData.student.currentUnit} · Ultima actividad {selectedStudentData.student.lastActivity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold text-emerald-700">
                        Hechas {selectedStudentData.done}
                      </span>
                      <span className="rounded-full bg-white px-3 py-2 text-[11px] font-bold text-amber-700">
                        Pendientes {selectedStudentData.pending + selectedStudentData.assigned}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 rounded-[22px] bg-white p-4 sm:flex-row sm:items-center">
                    <select
                      value={selectedGuideId}
                      onChange={(event) => setSelectedGuideId(event.target.value)}
                      className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-all focus:border-[#0187F3]"
                    >
                      {guides.map((guide) => (
                        <option key={guide.id} value={guide.id}>
                          {guide.code} · {guide.title}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={assignSelectedGuide}
                      className="rounded-full bg-[#ED3B62] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#ED3B62]/20 transition-all hover:bg-[#d12d52]"
                    >
                      Asignar guia
                    </button>
                  </div>

                  <div className="mt-5 space-y-2">
                    {selectedStudentData.items.length > 0 ? (
                      selectedStudentData.items.map((assignment) => {
                        const guide = guideMap[assignment.guideId];

                        return (
                          <div key={assignment.id} className="rounded-[20px] border border-slate-200 bg-white px-4 py-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <p className="text-sm font-extrabold text-[#1a1a2e]">{guide?.code}</p>
                                <p className="mt-1 text-sm text-slate-500">{guide?.title}</p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                {(['asignada', 'pendiente', 'hecha'] as AssignmentStatus[]).map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => updateAssignmentStatus(assignment.id, status)}
                                    className={`rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                                      assignment.status === status
                                        ? statusTone[status]
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                  >
                                    {statusLabel[status]}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-[20px] border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                        Sin guias asignadas todavia.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="space-y-8">
            <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(56,56,142,0.08)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0187F3]">Biblioteca rapida</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a2e]">Subir nueva guia</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Erika solo necesita cargar codigo, unidad y link. Desde aqui la guia queda lista para asignarse a estudiantes.
              </p>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Codigo o nombre</span>
                  <input
                    value={newGuide.code}
                    onChange={(event) => setNewGuide((current) => ({ ...current, code: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-all focus:border-[#0187F3] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Titulo visible</span>
                  <input
                    value={newGuide.title}
                    onChange={(event) => setNewGuide((current) => ({ ...current, title: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-all focus:border-[#0187F3] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Unidad o categoria</span>
                  <input
                    value={newGuide.unit}
                    onChange={(event) => setNewGuide((current) => ({ ...current, unit: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-all focus:border-[#0187F3] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Link</span>
                  <input
                    value={newGuide.link}
                    onChange={(event) => setNewGuide((current) => ({ ...current, link: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-all focus:border-[#0187F3] focus:bg-white"
                  />
                </label>
                <button
                  onClick={addGuide}
                  className="w-full rounded-full bg-[#38388E] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#38388E]/20 transition-all hover:bg-[#2c2c73]"
                >
                  Subir nueva guia
                </button>
              </div>
            </article>

            <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(56,56,142,0.08)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ED3B62]">Guias disponibles</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a2e]">Biblioteca para asignar</h2>
              <div className="mt-6 space-y-3">
                {guides.map((guide) => {
                  const assignedCount = assignments.filter((assignment) => assignment.guideId === guide.id).length;

                  return (
                    <button
                      key={guide.id}
                      onClick={() => setSelectedGuideId(guide.id)}
                      className={`w-full rounded-[22px] border p-4 text-left transition-all ${
                        selectedGuideId === guide.id
                          ? 'border-[#ED3B62]/30 bg-[#FFF5F7]'
                          : 'border-slate-200 bg-slate-50 hover:border-[#38388E]/25 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#38388E]">{guide.code}</p>
                          <p className="mt-1 text-base font-extrabold text-[#1a1a2e]">{guide.title}</p>
                          <p className="mt-1 text-sm text-slate-500">{guide.unit}</p>
                        </div>
                        <div className="rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ED3B62]">
                          {assignedCount} asignada{assignedCount === 1 ? '' : 's'}
                        </div>
                      </div>
                      <p className="mt-3 break-all text-sm leading-6 text-slate-500">{guide.link}</p>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_34px_rgba(56,56,142,0.08)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#38388E]">Puentes con otros paneles</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1a1a2e]">Cuando profundizar</h2>
              <div className="mt-6 space-y-3">
                <a
                  href="/flashmate/panel-docente.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-left no-underline transition-all hover:border-[#38388E]/25 hover:bg-white"
                >
                  <p className="text-sm font-extrabold text-[#1a1a2e]">Abrir planificacion completa</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Usa el panel docente cuando necesites organizar la semana, ensayos o asignacion por dia.</p>
                </a>
                <a
                  href="/flashmate/panel-seguimiento.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-left no-underline transition-all hover:border-[#0187F3]/25 hover:bg-white"
                >
                  <p className="text-sm font-extrabold text-[#1a1a2e]">Ver analisis completo</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Usa seguimiento para revisar logro, guias dominadas, errores y habilidades debiles.</p>
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );

  const accessView = (
    <div className="min-h-screen bg-[#EEF0F8] text-[#1a1a2e]">
      <header className="sticky top-0 z-50 bg-[#38388E] shadow-lg shadow-[#38388E]/20">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src="/images/flashmate-logo-erika.png"
              alt="Erika la Profe de Mate"
              className="h-12 w-auto shrink-0 object-contain sm:h-14"
            />
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                Sistema FlashMate
              </p>
              <p className="text-sm font-semibold text-white/80">
                Acceso exclusivo para alumnos activos
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-[#38388E]"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Volver
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#ED3B62]/15 blur-3xl"></div>
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#0187F3]/15 blur-3xl"></div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ED3B62]">
                Portal exclusivo
              </p>
              <h1 className="text-5xl font-extrabold leading-none sm:text-6xl lg:text-7xl">
                <span className="text-[#38388E]">Flash</span>
                <span className="text-[#ED3B62]">Mate</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Plataforma de apoyo para alumnos activos de Erika: guias, practica constante y seguimiento del avance entre clases.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
                {topStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 text-center shadow-[0_2px_16px_rgba(56,56,142,0.08)]">
                    <div className="text-[28px] font-extrabold text-[#38388E]">{stat.value}</div>
                    <div className="mt-1 text-[10px] leading-tight text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {accessCards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[24px] border border-white bg-white p-6 text-left no-underline shadow-[0_12px_36px_rgba(56,56,142,0.10)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(56,56,142,0.16)]"
                >
                  <div className="flex gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.bg}`} style={{ color: card.color }}>
                      <span className="material-symbols-outlined text-[30px]">{card.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{card.label}</p>
                      <h2 className="mt-1 text-xl font-extrabold text-[#1a1a2e]">{card.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em]" style={{ color: card.color }}>
                        {card.cta}
                        <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}

              <button
                onClick={() => {
                  setView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-[24px] border border-[#0187F3]/20 bg-[#F6FAFF] p-6 text-left shadow-[0_12px_36px_rgba(56,56,142,0.08)] transition-all hover:-translate-y-1 hover:border-[#0187F3]/35 hover:shadow-[0_20px_48px_rgba(1,135,243,0.14)]"
              >
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-[#0187F3]">
                    <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Erika</p>
                    <h2 className="mt-1 text-xl font-extrabold text-[#1a1a2e]">Centro de gestion Erika</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Mira estudiantes, detecta pendientes, sube nuevas guias y deriva al panel docente o al seguimiento cuando haga falta.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#0187F3]">
                      Entrar a gestion
                      <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

  return view === 'admin' ? adminView : accessView;
};

export default FlashmatePage;
