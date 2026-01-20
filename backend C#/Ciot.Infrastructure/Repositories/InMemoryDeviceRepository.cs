using Ciot.Domain.Entities;
using Ciot.Domain.Interfaces;
namespace Ciot.Infrastructure.Repositories
{
    public class InMemoryDeviceRepository : IDeviceRepository
    {
        private readonly Dictionary<string, Device> _devices = new();

        public IEnumerable<Device> GetAll() => _devices.Values;

        public Device? GetById(string id) =>
            _devices.TryGetValue(id, out var device) ? device : null;

        public void Add(Device device) =>
            _devices[device.Identifier] = device;
    }
}
